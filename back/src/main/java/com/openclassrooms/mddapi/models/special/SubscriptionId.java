package com.openclassrooms.mddapi.models.special;

import java.io.Serializable;
import java.util.Objects;

public class SubscriptionId implements Serializable {
    private Long userId;
    private Long themeId;

    public SubscriptionId() {
    }

    public SubscriptionId(Long userId, Long themeId) {
        this.userId = userId;
        this.themeId = themeId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;
        SubscriptionId that = (SubscriptionId) o;
        return Objects.equals(userId, that.userId) && Objects.equals(themeId, that.themeId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(userId, themeId);
    }
}
