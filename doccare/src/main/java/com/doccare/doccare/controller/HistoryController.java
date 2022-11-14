package com.doccare.doccare.controller;

import java.util.List;

import org.attoparser.trace.MarkupTraceEvent.EventType;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.doccare.doccare.model.History;
import com.doccare.doccare.model.HistoryEvent;
import com.doccare.doccare.service.HistoryService;

@RestController
@CrossOrigin(origins="http://localhost:3000")
@RequestMapping(value = "/api/v1", method = RequestMethod.GET)
public class HistoryController {
    @Autowired
    private HistoryService historyService;
    private Logger logger = LoggerFactory.getLogger(HistoryController.class);

    @GetMapping(value= "/patientaccepthistory")
    public ResponseEntity<Boolean> patientAcceptHistory(@RequestParam String patientId, @RequestParam String docConId) {
        return ResponseEntity.ok(this.historyService.addHistoryForPatient(HistoryEvent.ACCEPT, patientId, docConId));
    }

    @GetMapping(value= "/patientcancelhistory")
    public ResponseEntity<Boolean> patientCancelHistory(@RequestParam String patientId, @RequestParam String docConId) {
        return ResponseEntity.ok(this.historyService.addHistoryForPatient(HistoryEvent.CANCEL, patientId, docConId));
    }

    @GetMapping(value= "/patientforwardhistory")
    public ResponseEntity<Boolean> patientForwardHistory(@RequestParam String patientId, @RequestParam String docConId) {
        return ResponseEntity.ok(this.historyService.addHistoryForPatient(HistoryEvent.FORWARD, patientId, docConId));
    }

    @GetMapping(value = "/patientpendinghistory")
    public ResponseEntity<Boolean> patientPendingHistory(@RequestParam String patId) {
        return ResponseEntity.ok(this.historyService.addHistoryForPatient(HistoryEvent.PENDING, patId, patId));
    }

    @GetMapping(value= "/concancelhistory")
    public ResponseEntity<Boolean> counselorCancelHistory(@RequestParam String conId, @RequestParam String conPatId) {
        return ResponseEntity.ok(this.historyService.addHistoryForCounselor(HistoryEvent.CANCEL, conId, conPatId));
    }

    @GetMapping(value= "/conforwardhistory")
    public ResponseEntity<Boolean> counselorAcceptHistory(@RequestParam String conId, @RequestParam String conPatId,@RequestParam String docId) {
        return ResponseEntity.ok(this.historyService.addHistoryForCounselor(HistoryEvent.FORWARD, conId, conPatId,docId));
    }

    
    @GetMapping(value= "/docaccepthistory")
    public ResponseEntity<Boolean> doctorAcceptHistory(@RequestParam String docId, @RequestParam String patConId) {
        return ResponseEntity.ok(this.historyService.addHistoryForDoctor(HistoryEvent.ACCEPT, docId, patConId));
    }

    @GetMapping(value= "/doccancelhistory")
    public ResponseEntity<Boolean> doctorCancelHistory(@RequestParam String docId, @RequestParam String patConId) {
        return ResponseEntity.ok(this.historyService.addHistoryForDoctor(HistoryEvent.CANCEL, docId, patConId));
    }


    @GetMapping(value = "/patienthistory")
    public ResponseEntity<List<History>> getPatientHistories(@RequestParam String username) {
        this.logger.info("Chekcing if the username is geting properly : "+username);
        return ResponseEntity.ok(this.historyService.getHistoryForPatient(username));
    }

    @GetMapping(value = "/dochistory")
    public ResponseEntity<List<History>> getDocHistories(@RequestParam String username) {
        return ResponseEntity.ok(this.historyService.getHistoryForDoctor(username));
    }

    @GetMapping(value = "/conhistory")
    public ResponseEntity<List<History>> getConHistories(@RequestParam String username) {
        return ResponseEntity.ok(this.historyService.getHistoryForCounselor(username));
    }
}
