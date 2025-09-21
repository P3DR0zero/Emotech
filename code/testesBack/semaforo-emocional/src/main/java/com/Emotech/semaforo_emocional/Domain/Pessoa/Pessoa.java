package com.Emotech.semaforo_emocional.Domain.Pessoa;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.apache.logging.log4j.message.AsynchronouslyFormattable;

import java.util.UUID;


@AsynchronouslyFormattable
@Enttity
@Table
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Pessoa {
    @Id
    @GeneratedValue
    private String nome;
    private String email;
    private String telefone;
    private int idade;
    private UUID id;
}
