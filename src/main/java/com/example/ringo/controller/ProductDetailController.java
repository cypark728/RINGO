package com.example.ringo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Controller
public class ProductDetailController {
    @GetMapping("/ProductDetails/productdetail") //.do 해주세요
    public String productDetail(Model model) {
        model.addAttribute("pageName", "productdetail");
        System.out.println("뷰이름:" + "productdetail");

        return "productdetail"; //언제나 view화면으로 이동합니다.
    }
}

