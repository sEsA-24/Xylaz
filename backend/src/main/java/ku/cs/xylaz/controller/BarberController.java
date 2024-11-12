package ku.cs.xylaz.controller;

import ku.cs.xylaz.entity.Barber;
import ku.cs.xylaz.repository.BarberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/")
public class BarberController {
    @Autowired
    private final BarberRepository barberRepository;

    public BarberController(BarberRepository barberRepository) {
        this.barberRepository = barberRepository;
    }

    @PostMapping("/addBarber")
    public ResponseEntity<Barber> addBarber(@RequestBody Barber barber) {
        Barber savedBarber = barberRepository.save(barber);
        return new ResponseEntity<>(savedBarber, HttpStatus.CREATED);
    }


    @GetMapping("/")
    public List<Map<String, Object>> getAllBarberData() {
        return barberRepository.findAll().stream()
                .map(barber -> {
                    Map<String, Object> barberData = new HashMap<>();
                    barberData.put("barber_id", barber.getId());
                    barberData.put("name", barber.getName());
                    barberData.put("specialty", barber.getSpecialty());
                    barberData.put("experience", barber.getExperience());
                    barberData.put("profilePicture", barber.getProfilePicture());
                    barberData.put("gender", barber.getGender());
                    barberData.put("about", barber.getAbout());
                    return barberData;
                })
                .collect(Collectors.toList());
    }
}
