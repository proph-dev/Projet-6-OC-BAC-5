package com.openclassrooms.mddapi.services;

import com.openclassrooms.mddapi.models.Subscription;
import com.openclassrooms.mddapi.repository.SubscriptionRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SubscriptionService {

    private final SubscriptionRepository subscriptionRepository;

    @Autowired
    public SubscriptionService(SubscriptionRepository subscriptionRepository) {
        this.subscriptionRepository = subscriptionRepository;
    }

    public List<Long> getThemeIdsByUserId(Long userId) {

        List<Long> subscriptions = subscriptionRepository.findAllByUserId(userId);

        return subscriptions;
    }

    public Subscription createSubscription(Long userId, Long themeId) {
        Subscription subscription = new Subscription();
        subscription.setUserId(userId);
        subscription.setThemeId(themeId);
        Subscription savedSubscription = this.subscriptionRepository.save(subscription);
        return savedSubscription;
    }

    public void deleteSubscription(Long userId, Long themeId) {

        this.subscriptionRepository.deleteByUserIdAndThemeId(userId, themeId);

    }

}
