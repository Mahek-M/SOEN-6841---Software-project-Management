package com.doccare.doccare.service;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.doccare.doccare.controller.AuthController;
import com.doccare.doccare.dao.AssesmentAnswerRepo;
import com.doccare.doccare.dao.DoctorPatientAssignedSessionModelRepository;
import com.doccare.doccare.dao.UserRepository;
import com.doccare.doccare.model.AssesmentAnswer;
import com.doccare.doccare.model.DoctorPatientAssignedSessionModel;
import com.doccare.doccare.model.SessionScheduleModel;
import com.doccare.doccare.model.User;
import com.doccare.doccare.utils.Util;

@Service
public class UserDoctorSessionServiceImpl implements UserDoctorSessionService {
    @Autowired
    private DoctorPatientAssignedSessionModelRepository doctorPatientAssignedSessionModelRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private AssesmentAnswerRepo assesmentAnswerRepo;
    @Autowired
    private AuthService authService;
    private Logger logger = LoggerFactory.getLogger(UserDoctorSessionServiceImpl.class);

    @Override
    public boolean assignPatientToDoctor(String doctorId, String patientId) {
        try{

            User doctorUser = this.userRepository.findById(Long.valueOf(doctorId)).get();
            User patientUser = this.userRepository.findById(Long.valueOf(patientId)).get();

            DoctorPatientAssignedSessionModel doctorPatientAssignedSessionModel = new DoctorPatientAssignedSessionModel();
            
            doctorPatientAssignedSessionModel.setPatientUser(Long.valueOf(patientId));
            doctorPatientAssignedSessionModel.setDoctorUser(Long.valueOf(doctorId));

            DoctorPatientAssignedSessionModel savedSessionModelInstance = this.doctorPatientAssignedSessionModelRepository.save(doctorPatientAssignedSessionModel);

            doctorUser.setDocPatientSessionId(savedSessionModelInstance.getId());
            this.userRepository.save(doctorUser);

            patientUser.setDocPatientSessionId(savedSessionModelInstance.getId());
            this.userRepository.save(patientUser);

        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
        
        return true;
    }

    @Override
    public boolean rejectPatientByDoctor() {
        try {
            
            UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            User user = this.userRepository.findByEmail(userDetails.getUsername());
            DoctorPatientAssignedSessionModel doctorPatientAssignedSessionModel = this.doctorPatientAssignedSessionModelRepository.findById(Long.valueOf(user.getDocPatientSessionId())).get();
            Long patientId = Long.valueOf(doctorPatientAssignedSessionModel.getPatientUser());
            User patientUser = this.userRepository.findById(patientId).get();

            this.doctorPatientAssignedSessionModelRepository.delete(doctorPatientAssignedSessionModel);
            user.setDocPatientSessionId(null);
            this.userRepository.save(user);
            patientUser.setDocPatientSessionId(null);
            this.userRepository.save(patientUser);

            this.authService.rejectAppoinmentFromCounselor(patientUser.getEmail());
            

        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }

        return true;
    }

    @Override
    public Timestamp acceptPatientByDoctor(SessionScheduleModel sessionScheduleModel) {
        Timestamp timestamp = null;

        try {

            Calendar calendar = Calendar.getInstance();
            DoctorPatientAssignedSessionModel doctorPatientAssignedSessionModel = this.doctorPatientAssignedSessionModelRepository.
                                                                                                findByDoctorUser(Long. 
                                                                                                    valueOf(sessionScheduleModel.
                                                                                                        getDoctorId()));
            
            Integer year = Integer.parseInt(sessionScheduleModel.getDateString().split("-")[0]);
            Integer month = Integer.parseInt(sessionScheduleModel.getDateString().split("-")[1]);
            Integer date = Integer.parseInt(sessionScheduleModel.getDateString().split("-")[2]);

            calendar.set(year,month,date,Integer.parseInt(sessionScheduleModel.getHour()),Integer.parseInt(sessionScheduleModel.getMinute()));

            java.util.Date craftedDate = calendar.getTime();
            java.sql.Date sqlSaveableDate = Util.convertUtilDateToSqlDate(craftedDate);
            timestamp = new Timestamp(sqlSaveableDate.getTime());


            doctorPatientAssignedSessionModel.setSessionDate(timestamp);

            this.doctorPatientAssignedSessionModelRepository.save(doctorPatientAssignedSessionModel);

        } catch (Exception e) {
            e.printStackTrace();
        }

        return timestamp;
    }

    /**
     * This will be implemented in session 2.
     */
    @Override
    public boolean endPatientDoctorSession() {
        // TODO Auto-generated method stub
        return false;
    }

    @Override
    public List<User> getAvailableDoctorList() {
        return this.userRepository.findAll()
                                        .stream()
                                        .filter(userItem -> userItem
                                            .getDocPatientSessionId() == null)
                                        .filter(userItem -> userItem
                                            .getRole()
                                                .get(0)
                                                .getRole()
                                                .equals("doctor"))
                                        .toList();
    }

    @Override
    public List<User> getAssignedPatientList() {
        UserDetails userDetails = (UserDetails)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User thisUser = this.userRepository.findByEmail(userDetails.getUsername());
        
        if (thisUser.getDocPatientSessionId() == null) {
            this.logger.info("TEst ing hte id : "+thisUser.getDocPatientSessionId());

        } else {
            if (this.doctorPatientAssignedSessionModelRepository.findById(thisUser.getDocPatientSessionId()) != null) {
                this.logger.info("TEst ing hte id : "+thisUser.getDocPatientSessionId());

                DoctorPatientAssignedSessionModel doctorPatientAssignedSessionModel = this.doctorPatientAssignedSessionModelRepository.findById(thisUser.getDocPatientSessionId()).get();


                List<User> assignedDoctorList = this.userRepository.findAll()
                                                                    .stream()  
                                                                    .filter(item -> item.getId().equals(doctorPatientAssignedSessionModel.getPatientUser()))
                                                                    .filter(item -> item.getRole().get(0).getRole().equals("patient"))
                                                                    .filter(item -> item.getAssesmentAnswerGroup().getAssementAnsList().size() > 0)
                                                                    .filter(item -> item.getDocPatientSessionId() != null)
                                                                    .toList();

                this.logger.info("Size of assigned doc list : "+assignedDoctorList.size());
                return assignedDoctorList;

            }
        }

        List<User> nullList = new ArrayList<>();
        return nullList ;

        
    }
    
}
