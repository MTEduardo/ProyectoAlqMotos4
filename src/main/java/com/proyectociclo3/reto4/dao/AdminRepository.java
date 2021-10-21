package com.proyectociclo3.reto4.dao;

import com.proyectociclo3.reto4.entity.Admin;
import com.proyectociclo3.reto4.entity.AdminCrud;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class AdminRepository {

    @Autowired
    private AdminCrud adminCrudRepository;

    public List<Admin> getAll() {
        return (List<Admin>) adminCrudRepository.findAll();
    }

    public Optional<Admin> getAdmin(int id) {
        return adminCrudRepository.findById(id);
    }

    public Admin save(Admin admin) {
        return adminCrudRepository.save(admin);
    }

    public void delete(Admin admin) {
        adminCrudRepository.delete(admin);
    }

}
