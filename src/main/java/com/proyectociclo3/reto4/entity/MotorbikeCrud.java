package com.proyectociclo3.reto4.entity;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MotorbikeCrud extends CrudRepository<Motorbike, Integer> {
    
}
