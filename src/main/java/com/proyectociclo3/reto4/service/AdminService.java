package com.proyectociclo3.reto4.service;

import com.proyectociclo3.reto4.dao.AdminRepository;
import com.proyectociclo3.reto4.entity.Admin;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdminService {

    @Autowired
    AdminRepository adminRepository;

    public List<Admin> getAll() {
        return (List<Admin>) adminRepository.getAll();
    }

    public Optional<Admin> getAdmin(int id) {
        return adminRepository.getAdmin(id);
    }

    public Admin save(Admin admin) {
        if (admin.getIdAdmin() == null) {
            return adminRepository.save(admin);
        } else {
            Optional<Admin> co = adminRepository.getAdmin(admin.getIdAdmin());
            if (co.isEmpty()) {
                return adminRepository.save(admin);
            } else {
                return admin;
            }
        }
    }

    public Admin update(Admin admin) {
        if (admin.getIdAdmin() != null) {
            Optional<Admin> e = adminRepository.getAdmin(admin.getIdAdmin());
            if (!e.isEmpty()) {
                if (admin.getEmail()!= null) {
                    e.get().setEmail(admin.getEmail());
                }
                if (admin.getPassword()!= null) {
                    e.get().setPassword(admin.getPassword());
                }
                if (admin.getUserName()!= null) {
                    e.get().setUserName(admin.getUserName());
                }
                adminRepository.save(e.get());
                return e.get();
            } else {
                return admin;
            }
        } else {
            return admin;
        }
    }
    
    public boolean deleteAdmin(int id){
        Optional <Admin> admin = adminRepository.getAdmin(id);
        if (admin.isEmpty()){
            return false;
        } else {
            adminRepository.delete(admin.get());
            return false;
        }
    }
    
}
