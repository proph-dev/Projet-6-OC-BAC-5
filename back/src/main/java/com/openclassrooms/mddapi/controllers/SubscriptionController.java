package com.openclassrooms.mddapi.controllers;

import com.openclassrooms.mddapi.models.Subscription;
import com.openclassrooms.mddapi.payload.response.MessageResponse;
import com.openclassrooms.mddapi.services.SubscriptionService;
import com.openclassrooms.mddapi.services.UserService;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/subscription")
public class SubscriptionController {

    private final SubscriptionService subscriptionService;

    private final UserService userService;

    @Autowired
    public SubscriptionController(SubscriptionService subscriptionService, UserService userService) {
        this.subscriptionService = subscriptionService;
        this.userService = userService;
    }

    @PostMapping("/create/{id}")
    public ResponseEntity<Subscription> createSubscription(@PathVariable("id") Long themeId,
            HttpServletRequest request) {

        Long userId = userService.getUserIdFromAuth(request);
        Subscription newSubscription = subscriptionService.createSubscription(userId, themeId);
        return ResponseEntity.ok(newSubscription);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<MessageResponse> deleteSubscription(@PathVariable("id") Long themeId,
            HttpServletRequest request) {
        try {
            Long userId = userService.getUserIdFromAuth(request);
            subscriptionService.deleteSubscription(userId, themeId);
            return ResponseEntity.status(HttpStatus.OK).body(new MessageResponse("Subscription deleted"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(new MessageResponse(e.getMessage()));
        }
    }

    @GetMapping("/all")
    public ResponseEntity<List<Long>> getAllSubscriptions(HttpServletRequest request) {
        Long userId = userService.getUserIdFromAuth(request);
        List<Long> subscriptions = subscriptionService.getThemeIdsByUserId(userId);
        return ResponseEntity.ok(subscriptions);
    }
}
