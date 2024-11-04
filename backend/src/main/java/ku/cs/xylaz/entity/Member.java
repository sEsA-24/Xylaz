package ku.cs.xylaz.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.GenericGenerator;

import java.util.UUID;

@Data
@Entity
@Table(name = "members") // กำหนดชื่อตารางในฐานข้อมูล
public class Member {
    @Id
    @GeneratedValue
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(name = "member_id", updatable = false, nullable = false)
    private UUID id;

    @Column(nullable = false, unique = true) // ค่าที่ไม่ซ้ำกัน
    private String username;

    @Column(nullable = false) // รหัสผ่านจะต้องมีค่า
    private String password;

    @Column(nullable = false) // ชื่อจะต้องมีค่า
    private String name;

    @Column(nullable = false) // ระบุบทบาท
    private String role;

    private String email;
    private String phone;
}
