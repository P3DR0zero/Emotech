import org.springframework.data.jpa.repository.JpaRepository;
import org.stereotype.Repository;

import java.util.UUID;

@Repository
public interface PessoasRepository extends JpaRepository<Pessoas, UUID> {
    // Spring Data JPA já fornece todos os métodos CRUD básicos como:
    // save(), findById(), findAll(), delete(), etc.
    // Dá pra adicionar aqui métodos de consulta personalizados, se precisar.
}