package com.proyectociclo3.reto4.service;

import com.proyectociclo3.reto4.dao.MotorbikeRepository;
import com.proyectociclo3.reto4.entity.Motorbike;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MotorbikeService {
    @Autowired
    MotorbikeRepository motorbikeRepository;
    
  public List<Motorbike> getAll() {return (List<Motorbike>) motorbikeRepository.getAll();};
  
  public Optional<Motorbike> getMotorbike(int id) {return motorbikeRepository.getMotorbike(id);};
  
  public Motorbike save(Motorbike motorbike) { 
       if (motorbike.getId()== null){
           return motorbikeRepository.save(motorbike);
       }
       else
       {
          Optional<Motorbike> co =  motorbikeRepository.getMotorbike(motorbike.getId());
          if (co.isEmpty()){
              return motorbikeRepository.save(motorbike);
          }
          else
          {
              return motorbike;
          }
       }
    }
  
    public Motorbike update(Motorbike motorbike) {
        if (motorbike.getId() != null) {
            Optional<Motorbike> e = motorbikeRepository.getMotorbike(motorbike.getId());
            if (!e.isEmpty()) {
                if (motorbike.getBrand() != null) {
                    e.get().setBrand(motorbike.getBrand());
                }
                if (motorbike.getYear() != null) {
                    e.get().setYear(motorbike.getYear());
                }
                if (motorbike.getCategory() != null) {
                    e.get().setCategory(motorbike.getCategory());
                }
                if (motorbike.getName() != null) {
                    e.get().setName(motorbike.getName());
                }
                if (motorbike.getDescription()!= null) {
                    e.get().setDescription(motorbike.getDescription());
                }
                motorbikeRepository.save(e.get());
                return e.get();
            } else {
                return motorbike;
            }
        } else {
            return motorbike;
        }
    }
    
    public boolean deleteMotorbike(int id){
        Optional <Motorbike> motorbike = motorbikeRepository.getMotorbike(id);
        if (motorbike.isEmpty()){
            return false;
        } else {
            motorbikeRepository.delete(motorbike.get());
            return false;
        }
    }
    
}
