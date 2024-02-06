package mz.misau.sisgi.controller.workflow;

import mz.misau.sisgi.entity.workflow.ForwardingAgent;
import mz.misau.sisgi.entity.workflow.Goods;
import mz.misau.sisgi.repository.workflow.GoodsRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/goods")
public class GoodsController {

    private final GoodsRepository goodsRepository;

    public GoodsController(GoodsRepository goodsRepository) {
        this.goodsRepository = goodsRepository;
    }
    @GetMapping
    public List<Goods> getAll(){
        return goodsRepository.findAll();
    }

    @PostMapping
    public Goods addNew (@RequestBody Goods goods){
        Goods registedGood = goodsRepository.save(goods);
        return registedGood;
    }
}
