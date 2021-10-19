package com.proyectociclo3.reto4.service;

import com.proyectociclo3.reto4.dao.ReservationRepository;
import com.proyectociclo3.reto4.entity.Reservation;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ReservationService {
    @Autowired
    ReservationRepository reservationRepository;
    
  public List<Reservation> getAll() {return (List<Reservation>) reservationRepository.getAll();};
  
  public Optional<Reservation> getReservation(int id) {return reservationRepository.getReservation(id);};
  
  public Reservation save(Reservation reservation) { 
       if (reservation.getIdReservation()== null){
           return reservationRepository.save(reservation);
       }
       else
       {
          Optional<Reservation> co =  reservationRepository.getReservation(reservation.getIdReservation());
          if (co.isEmpty()){
              return reservationRepository.save(reservation);
          }
          else
          {
              return reservation;
          }
       }
    }

    public Reservation update(Reservation reservation) {
        if (reservation.getIdReservation() != null) {
            Optional<Reservation> e = reservationRepository.getReservation(reservation.getIdReservation());
            if (!e.isEmpty()) {
                if (reservation.getStartDate() != null) {
                    e.get().setStartDate(reservation.getStartDate());
                }
                if (reservation.getDevolutionDate()!= null) {
                    e.get().setDevolutionDate(reservation.getDevolutionDate());
                }
                if (reservation.getClient()!= null) {
                    e.get().setClient(reservation.getClient());
                }
                if (reservation.getMotorbike()!= null) {
                    e.get().setMotorbike(reservation.getMotorbike());
                }
                reservationRepository.save(e.get());
                return e.get();
            } else {
                return reservation;
            }
        } else {
            return reservation;
        }
    }
    
    public boolean deleteReservation(int id){
        Optional <Reservation> reservation = reservationRepository.getReservation(id);
        if (reservation.isEmpty()){
            return false;
        } else {
            reservationRepository.delete(reservation.get());
            return false;
        }
    }
}
