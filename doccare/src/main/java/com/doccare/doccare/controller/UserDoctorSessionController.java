package com.doccare.doccare.controller;

import java.sql.Timestamp;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.doccare.doccare.model.User;
import com.doccare.doccare.service.UserDoctorSessionService;

@RestController
@CrossOrigin(origins="http://localhost:3000")
@RequestMapping(value = "/api/v1", method = RequestMethod.GET)
public class UserDoctorSessionController {
    @Autowired
    private UserDoctorSessionService userDoctorSessionService;

    @GetMapping(value = "/assigndoctor")
    public ResponseEntity<Boolean> assignDoctor(@RequestParam String doctorId, @RequestParam String patientId) {
        return ResponseEntity.ok(this.userDoctorSessionService.assignPatientToDoctor(doctorId,patientId));
    }

    @DeleteMapping(value = "/rejectpatientbydoctor")
    public ResponseEntity<Boolean> rejectPatientByDoctor() {
        return ResponseEntity.ok(this.userDoctorSessionService.rejectPatientByDoctor());
    }

    /**
     * 
     * @param userId -- id of either user or patient
     * @return session time Schedule generate a zoom link
     */
    // @GetMapping(value ="/acceptsession")
    // public ResponseEntity<Timestamp> acceptSession(@RequestParam String userId) {
    //     return ResponseEntity.ok(this.userDoctorSessionService.acceptPatientByDoctor());
    // }

    @GetMapping(value = "/getavailabledoclist") 
    public ResponseEntity<List<User>> getAvailableDocList () {
        return ResponseEntity.ok(this.userDoctorSessionService.getAvailableDoctorList());
    }
    @GetMapping(value = "/getassignedpatlist")
    public ResponseEntity<List<User>> getAssignedPatList () {
        return ResponseEntity.ok(this.userDoctorSessionService.getAssignedPatientList());
    }
}
