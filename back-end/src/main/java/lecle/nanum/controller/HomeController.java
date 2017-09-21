package lecle.nanum.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * Created by manhvu on 9/20/17.
 */
@Controller
public class HomeController {

    @GetMapping(value = {"", "/"})
    public String index() {
        return "index";
    }

}
