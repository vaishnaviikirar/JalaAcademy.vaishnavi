package com.jala;

import org.springframework.web.bind.annotation.*;
import java.util.*;
import java.util.concurrent.CopyOnWriteArrayList;

@RestController
@CrossOrigin("*")
public class ApiController {

    List<Employee> employees = new CopyOnWriteArrayList<>();

    @PostMapping("/login")
    public Map<String,String> login(@RequestBody Map<String,String> data){

        Map<String,String> map = new HashMap<>();

        if(data.get("email").equals("training@jalaacademy.com")
        && data.get("password").equals("jobprogram")){

            map.put("status","success");

        }else{
            map.put("status","failed");
        }

        return map;
    }

    @GetMapping("/employees")
    public List<Employee> getEmployees(){
        return employees;
    }

    @PostMapping("/employees")
    public Employee save(@RequestBody Employee employee){

        employees.removeIf(emp -> emp.getId()==employee.getId());

        employees.add(employee);

        return employee;
    }

    @DeleteMapping("/employees/{id}")
    public String delete(@PathVariable int id){

        employees.removeIf(emp -> emp.getId()==id);

        return "deleted";
    }

    @GetMapping("/api/languages")
    public List<String> languages(){

        return Arrays.asList(
        "Java","Spring Boot","JavaScript","React",
        "HTML","CSS","SQL","Python","C","C++",
        "Groovy","PHP","Angular","NodeJS");
    }
}