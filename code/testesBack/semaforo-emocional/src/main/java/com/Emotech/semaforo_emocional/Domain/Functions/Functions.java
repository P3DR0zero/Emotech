package com.Emotech.semaforo_emocional.Domain.Functions;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.apache.logging.log4j.message.AsynchronouslyFormattable;

import java.util.UUID;


@Table
@Entity
public class Functions {
    @Id
    @GeneratedValue

    private UUID id;

    @OneToOne
    @JoinColumn(name =)
    private pessoa;

    private func;

}