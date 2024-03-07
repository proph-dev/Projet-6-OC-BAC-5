package com.openclassrooms.mddapi.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import com.openclassrooms.mddapi.models.Subscription;
import com.openclassrooms.mddapi.models.special.SubscriptionId;

@Repository
public interface SubscriptionRepository extends JpaRepository<Subscription, SubscriptionId> {

    @Query("SELECT themeId FROM Subscription s WHERE s.userId = :userId")
    List<Long> findAllByUserId(Long userId);

    @Query("DELETE FROM Subscription s WHERE s.userId = :userId AND s.themeId = :themeId")
    @Modifying
    @Transactional
    void deleteByUserIdAndThemeId(Long userId, Long themeId);

}