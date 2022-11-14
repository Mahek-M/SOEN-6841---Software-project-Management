package com.doccare.doccare.utils;

import java.time.DateTimeException;

import com.doccare.doccare.model.HistoryEvent;

public class Util {
    public static java.sql.Date convertUtilDateToSqlDate (java.util.Date date) {
        java.sql.Date sqlDate = null;

        try {
            sqlDate = new java.sql.Date(date.getTime());
        } catch (DateTimeException e) {
            e.printStackTrace();
        }
        
        return sqlDate;
    }

    // public static String analizeHistoryEvent(HistoryEvent event, String toUser,String byUser,String byRole,String role) {
    //     String returnAbleString = "";
    //     switch (event) {
    //         case ACCEPT:
    //             if (role.equals("patient")) {
    //                 returnAbleString += "Your appoinment is accepted by "+byRole+" "+byUser;
    //             } else if (role.equals("doctor")) {
    //                 returnAbleString += "You accepted "+byRole+" "+byUser;
    //             }
    //             break;
    //         case CANCEL:
    //             if (role.equals("patient")) {
    //                 returnAbleString += "Your appoinment is canceled by "+byRole+" "+byUser;
    //             } else if (role.equals("doctor")) {
    //                 returnAbleString += "You canceled "+byRole+" "+byUser;
    //             } else if (role.equals("counselor")) {
    //                 returnAbleString += "You canceled "+byRole+" "+byUser;
    //             }
    //             break;
    //         case FORWARD:
    //             if (role.equals("patient")) {
    //                 returnAbleString += "Your appoinment is forwarded by "+byRole+" "+byUser;
    //             } else if (role.equals("counselor")) {
    //                 returnAbleString += "You forwarded "+byRole+" "+byUser;
    //             }
    //             break;
    //         default:
    //             break;
    //     }


    //     return returnAbleString;
    // }

    public static String analizeHistoryEvent(HistoryEvent event) {
        switch (event) {
            case ACCEPT:
                return "Accepted";
            case CANCEL:
                return "Canceled";
            case FORWARD:
                return "Forwarded";
            case PENDING:
                return "Pending";
            default:
                return "";
        }

    }
    
}
