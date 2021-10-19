package com.proyectociclo3.reto4.service;

import com.proyectociclo3.reto4.dao.ClientRepository;
import com.proyectociclo3.reto4.entity.Client;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ClientService {

    @Autowired
    ClientRepository clientRepository;

    public List<Client> getAll() {
        return (List<Client>) clientRepository.getAll();
    }
  
  public Optional<Client> getClient(int id) {
        return clientRepository.getClient(id);
    }

  public Client save(Client client) {
        if (client.getIdClient() == null) {
            return clientRepository.save(client);
        } else {
            Optional<Client> co = clientRepository.getClient(client.getIdClient());
            if (co.isEmpty()) {
                return clientRepository.save(client);
            } else {
                return client;
            }
        }
    }

    public Client update(Client client) {
        if (client.getIdClient() != null) {
            Optional<Client> e = clientRepository.getClient(client.getIdClient());
            if (!e.isEmpty()) {
                if (client.getName() != null) {
                    e.get().setName(client.getName());
                }
                if (client.getEmail() != null) {
                    e.get().setEmail(client.getEmail());
                }
                if (client.getPassword() != null) {
                    e.get().setPassword(client.getPassword());
                }
                if (client.getAge() != null) {
                    e.get().setAge(client.getAge());
                }
                clientRepository.save(e.get());
                return e.get();
            } else {
                return client;
            }
        } else {
            return client;
        }
    }

    public boolean deleteClient(int id) {
        Optional<Client> client = clientRepository.getClient(id);
        if (client.isEmpty()) {
            return false;
        } else {
            clientRepository.delete(client.get());
            return false;
        }
    }
}
