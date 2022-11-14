package com.doccare.doccare.service;

import com.doccare.doccare.model.History;
import com.doccare.doccare.model.HistoryEvent;
import java.util.List;

public interface HistoryService {
    public boolean addHistoryForPatient(HistoryEvent event,String patientId,String docConId);
    public boolean addHistoryForDoctor(HistoryEvent event,String doctorId, String patConId);
    public boolean addHistoryForCounselor(HistoryEvent event, String conId, String conPatId);
    public boolean addHistoryForCounselor(HistoryEvent event, String conId, String conPatId,String docId);

    public List<History> getHistoryForPatient(String username);
    public List<History> getHistoryForDoctor(String username);
    public List<History> getHistoryForCounselor(String username);
}
