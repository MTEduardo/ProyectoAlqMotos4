package com.proyectociclo3.reto4.service;

import com.proyectociclo3.reto4.dao.ScoreRepository;
import com.proyectociclo3.reto4.entity.Score;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ScoreService {

    @Autowired
    ScoreRepository scoreRepository;

    public List<Score> getAll() {
        return (List<Score>) scoreRepository.getAll();
    }

    public Optional<Score> getScore(int id) {
        return scoreRepository.getScore(id);
    }

    public Score save(Score score) {
        if (score.getIdScore() == null) {
            return scoreRepository.save(score);
        } else {
            Optional<Score> co = scoreRepository.getScore(score.getIdScore());
            if (co.isEmpty()) {
                return scoreRepository.save(score);
            } else {
                return score;
            }
        }
    }

    public Score update(Score score) {
        if (score.getIdScore() != null) {
            Optional<Score> e = scoreRepository.getScore(score.getIdScore());
            if (!e.isEmpty()) {
                if (score.getStars() != null) {
                    e.get().setStars(score.getStars());
                }
                if (score.getMessageText()!= null) {
                    e.get().setMessageText(score.getMessageText());
                }
                scoreRepository.save(e.get());
                return e.get();
            } else {
                return score;
            }
        } else {
            return score;
        }
    }
    
    public boolean deleteScore(int id){
        Optional <Score> score = scoreRepository.getScore(id);
        if (score.isEmpty()){
            return false;
        } else {
            scoreRepository.delete(score.get());
            return false;
        }
    }
    
}
