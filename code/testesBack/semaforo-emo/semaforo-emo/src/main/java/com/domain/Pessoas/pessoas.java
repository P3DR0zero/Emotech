import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Enumerated;
import jakarta.persistence.EnumType;

import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "pessoas")
@Data // Anotação do Lombok para getters, setters, toString, equals e hashCode
@NoArgsConstructor // Construtor vazio, exigido pelo JPA
@AllArgsConstructor // Construtor com todos os campos
public class Pessoas {

    @Id
    @GeneratedValue
    private UUID id;

    private String nome;

    @Enumerated(EnumType.STRING)
    private FuncaoPessoa funcao;
}