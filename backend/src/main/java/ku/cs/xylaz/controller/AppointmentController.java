package ku.cs.xylaz.controller;

import ku.cs.xylaz.entity.Appointment;
import ku.cs.xylaz.repository.AppointmentRepository;
import ku.cs.xylaz.request.AppointmentRequest;
import ku.cs.xylaz.service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/appointment")
public class AppointmentController {

    private final AppointmentService appointmentService;

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    public AppointmentController(AppointmentService appointmentService) {
        this.appointmentService = appointmentService;
    }

    @PostMapping("/{docId}")
    public ResponseEntity<?> bookAppointment(@PathVariable String docId, @RequestBody AppointmentRequest request) {
        try {
            Appointment savedAppointment = appointmentService.bookAppointment(docId, request);
            return new ResponseEntity<>(savedAppointment, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("เกิดข้อผิดพลาดในการจองนัดหมาย");
        }
    }

    @GetMapping
    public List<Map<String, Object>> getAllAppointmentData() {
        return appointmentRepository.findAll().stream()
                .map(appointment -> {
                    Map<String, Object> appointmentData = new HashMap<>();
                    String appointmentDateTime = appointment.getAppointmentDate();

                    // แยกวันที่และเวลา
                    String[] dateTimeParts = appointmentDateTime.split(" ");
                    String date = dateTimeParts[0];
                    String time = dateTimeParts[1];

                    appointmentData.put("id", appointment.getId().toString());  // แปลง UUID เป็น String
                    appointmentData.put("appointment_date", date);
                    appointmentData.put("appointment_time", time);
                    appointmentData.put("service_type", appointment.getServiceType());
                    appointmentData.put("status", appointment.getStatus());
                    appointmentData.put("barber_id", appointment.getBarber().getId().toString());  // แปลง UUID เป็น String
                    appointmentData.put("member_id", appointment.getMember().getId().toString());  // แปลง UUID เป็น String

                    return appointmentData;
                })
                .collect(Collectors.toList());
    }
}
