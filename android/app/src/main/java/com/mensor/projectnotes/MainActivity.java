package com.mensor.projectnotes;

import android.graphics.Color;
import android.os.Bundle;
import androidx.core.view.WindowCompat;
import androidx.core.view.WindowInsetsControllerCompat;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        setTheme(R.style.AppTheme_NoActionBar);
        registerPlugin(NativeBiometricPlugin.class);
        super.onCreate(savedInstanceState);

        // Ensure the app content fits inside system windows (above tablet taskbar & navigation bar)
        WindowCompat.setDecorFitsSystemWindows(getWindow(), true);

        // Force opaque navigation bar & status bar background (#FAFAFA) to eliminate screen bleed-through
        getWindow().setStatusBarColor(Color.parseColor("#FAFAFA"));
        getWindow().setNavigationBarColor(Color.parseColor("#FAFAFA"));

        WindowInsetsControllerCompat insetsController = WindowCompat.getInsetsController(getWindow(), getWindow().getDecorView());
        if (insetsController != null) {
            insetsController.setAppearanceLightStatusBars(true);
            insetsController.setAppearanceLightNavigationBars(true);
        }
    }
}
