package com.doccare.doccare.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.doccare.doccare.dao.HistoryRepository;
import com.doccare.doccare.dao.UserRepository;
import com.doccare.doccare.model.History;
import com.doccare.doccare.model.HistoryEvent;
import com.doccare.doccare.model.User;
import com.doccare.doccare.utils.Util;

@Service
public class HistoryServiceImpl implements HistoryService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private HistoryRepository historyRepository;
    private Logger logger = LoggerFactory.getLogger(HistoryServiceImpl.class);

    @Override
    public boolean addHistoryForPatient(HistoryEvent event, String patientId, String docConId) {

        this.logger.info("VAlue of patientId : "+patientId+" docConId "+docConId);

        try {
            User patientUser = this.userRepository.findById(Long.valueOf(patientId)).get();
            User docConUser = this.userRepository.findById(Long.valueOf(docConId)).get();
            
            if (patientUser == null || docConUser == null) {
                return false;
            }
            List<History> histories = patientUser.getHistories();

            History history = new History();
            history.setUser(patientUser);
            // history.setHistory(Util.analizeHistoryEvent(event, patientUser.getName(), docConUser.getName(),docConUser.getRole().get(0).getRole(),patientUser.getRole().get(0).getRole()));            
            history.setHistory(Util.analizeHistoryEvent(event)); 
            history.setName(docConUser.getName());         
            history.setRole(docConUser.getRole().get(0).getRole());
            history.setImage(docConUser.getProfileImage().getImage());           
            
            this.historyRepository.save(history);
            histories.add(history);
            
            patientUser.setHistories(histories);
            this.userRepository.save(patientUser);
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
        return true;
    }

    @Override
    public boolean addHistoryForDoctor(HistoryEvent event, String doctorId, String patConId) {
       try {
            User docUser = this.userRepository.findById(Long.valueOf(doctorId)).get();
            User patConUser = this.userRepository.findById(Long.valueOf(patConId)).get();
            
            if (docUser == null || patConUser == null) {
                return false;
            }
            List<History> histories = docUser.getHistories();

            History history = new History();
            history.setUser(docUser);
            // history.setHistory(Util.analizeHistoryEvent(event, docUser.getName(), patConUser.getName(),patConUser.getRole().get(0).getRole(),docUser.getRole().get(0).getRole()));            
            history.setHistory(Util.analizeHistoryEvent(event));            
            history.setName(patConUser.getName());         
            history.setRole(patConUser.getRole().get(0).getRole());
            history.setImage(patConUser.getProfileImage().getImage());

            this.historyRepository.save(history);
            histories.add(history);
            
            docUser.setHistories(histories);
            this.userRepository.save(docUser);
       } catch (Exception e) {
            e.printStackTrace();
            return false;
       }

        return true;
    }

    @Override
    public boolean addHistoryForCounselor(HistoryEvent event, String conId, String docPatId) {
        try {
            User conUser = this.userRepository.findById(Long.valueOf(conId)).get();
            User docPatUser = this.userRepository.findById(Long.valueOf(docPatId)).get();
            
            if (conUser == null || docPatUser == null) {
                return false;
            }
            List<History> histories = conUser.getHistories();

            History history = new History();
            history.setUser(conUser);
            // history.setHistory(Util.analizeHistoryEvent(event, conUser.getName(), docPatUser.getName(),docPatUser.getRole().get(0).getRole(),conUser.getRole().get(0).getRole()));            
            history.setHistory(Util.analizeHistoryEvent(event));    
            history.setName(docPatUser.getName());         
            history.setRole(docPatUser.getRole().get(0).getRole());
            history.setImage(docPatUser.getProfileImage().getImage());              

            this.historyRepository.save(history);
            histories.add(history);
            
            conUser.setHistories(histories);
            this.userRepository.save(conUser);
       } catch (Exception e) {
            e.printStackTrace();
            return false;
       }

        return true;
    }

    @Override
    public boolean addHistoryForCounselor(HistoryEvent event, String conId, String docPatId,String docId) {
        try {
            User conUser = this.userRepository.findById(Long.valueOf(conId)).get();
            User docPatUser = this.userRepository.findById(Long.valueOf(docPatId)).get();
            User docUser = this.userRepository.findById(Long.valueOf(docId)).get();
            
            if (conUser == null || docPatUser == null || docUser == null) {
                return false;
            }
            List<History> histories = conUser.getHistories();

            History history = new History();
            history.setUser(conUser);
            // history.setHistory(Util.analizeHistoryEvent(event, conUser.getName(), docPatUser.getName(),docPatUser.getRole().get(0).getRole(),conUser.getRole().get(0).getRole()));            
            history.setHistory(Util.analizeHistoryEvent(event));    
            history.setName(docPatUser.getName());         
            history.setRole(docPatUser.getRole().get(0).getRole());
            history.setImage(docPatUser.getProfileImage().getImage());   
            
            history.setForwardedName(docUser.getName());
            history.setForwardedRole(docUser.getRole().get(0).getRole());
            history.setForwardedImage(docUser.getProfileImage().getImage());

            this.historyRepository.save(history);
            histories.add(history);
            
            conUser.setHistories(histories);
            this.userRepository.save(conUser);
       } catch (Exception e) {
            e.printStackTrace();
            return false;
       }

        return true;
    }

    @Override
    public List<History> getHistoryForPatient(String username) {
        User patientUser = this.userRepository.findByEmail(username);

        if (patientUser == null) {
            return null;
        }

        // User docConUser = this.userRepository.findById(Long.valueOf(patientUser.getHi)).get();


        // if (!patientUser.getRole().get(0).getRole().equals("patient")) {
        //     return null;
        // }

        Collections.reverse(patientUser.getHistories());


        return patientUser.getHistories();
    }

    @Override
    public List<History> getHistoryForDoctor(String username) {
        User docUser = this.userRepository.findByEmail(username);
        if (docUser == null) {
            return null;
        }

        if (!docUser.getRole().get(0).getRole().equals("doctor")) {
            return null;
        }

        Collections.reverse(docUser.getHistories());

        return docUser.getHistories();
    }

    @Override
    public List<History> getHistoryForCounselor(String username) {
        User conUser = this.userRepository.findByEmail(username);
        if (conUser == null) {
            return null;
        }

        if (!conUser.getRole().get(0).getRole().equals("counselor")) {
            return null;
        }

        Collections.reverse(conUser.getHistories());

        return conUser.getHistories();
    }
    
}
