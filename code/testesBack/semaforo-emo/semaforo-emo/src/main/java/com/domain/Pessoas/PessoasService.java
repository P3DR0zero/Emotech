import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PessoasService {

    private final PessoasRepository pessoasRepository;

    @Autowired
    public PessoasService(PessoasRepository pessoasRepository) {
        this.pessoasRepository = pessoasRepository;
    }

    public Pessoas criarPessoa(String nome, FuncaoPessoa funcao) {
        Pessoas novaPessoa = new Pessoas(nome, funcao);
        return pessoasRepository.save(novaPessoa);
    }
}