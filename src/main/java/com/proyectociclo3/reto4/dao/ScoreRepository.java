package com.proyectociclo3.reto4.dao;

import com.proyectociclo3.reto4.entity.Score;
import com.proyectociclo3.reto4.entity.ScoreCrud;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class ScoreRepository {

    @Autowired
    private ScoreCrud scoreCrudRepository;

    public List<Score> getAll() {
        return (List<Score>) scoreCrudRepository.findAll();
    }

    public Optional<Score> getScore(int id) {
        return scoreCrudRepository.findById(id);
    }

    public Score save(Score score) {
        return scoreCrudRepository.save(score);
    }

    public void delete(Score score) {
        scoreCrudRepository.delete(score);
    }

}
