package lecle.nanum.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * Created by manhvu on 9/20/17.
 */
@Controller
public class HomeController {

    @GetMapping(value = {"", "/"})
    public String index() {
        return "index";
    }

    @GetMapping(value = "/health-check/private")
    @ResponseBody
    public String healthCheckPrivate() {
        return "health check private success";
    }
}
