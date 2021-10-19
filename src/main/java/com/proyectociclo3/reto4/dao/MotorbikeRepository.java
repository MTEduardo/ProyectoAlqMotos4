package com.proyectociclo3.reto4.dao;

import com.proyectociclo3.reto4.entity.Motorbike;
import com.proyectociclo3.reto4.entity.MotorbikeCrud;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class MotorbikeRepository {

    @Autowired
    private MotorbikeCrud motorbikeCrudRepository;

    public List<Motorbike> getAll() {
        return (List<Motorbike>) motorbikeCrudRepository.findAll();
    }

    public Optional<Motorbike> getMotorbike(int id) {
        return motorbikeCrudRepository.findById(id);
    }

    public Motorbike save(Motorbike motorbike) {
        return motorbikeCrudRepository.save(motorbike);
    }

    public void delete(Motorbike motorbike) {
        motorbikeCrudRepository.delete(motorbike);
    }

}
