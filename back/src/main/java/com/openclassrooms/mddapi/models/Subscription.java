package com.openclassrooms.mddapi.models;

import lombok.*;
import lombok.experimental.Accessors;

import javax.persistence.*;

import com.openclassrooms.mddapi.models.special.SubscriptionId;

@Entity
@Table(name = "SUBSCRIPTIONS")
@Data
@Accessors(chain = true)
@NoArgsConstructor
@ToString
@IdClass(SubscriptionId.class)
public class Subscription {

  @NonNull
  @Id
  @Column(name = "user_id")
  private Long userId;

  @NonNull
  @Id
  @Column(name = "theme_id")
  private Long themeId;

  public Subscription(Long userId, Long themeId) {
    this.userId = userId;
    this.themeId = themeId;
  }
}
