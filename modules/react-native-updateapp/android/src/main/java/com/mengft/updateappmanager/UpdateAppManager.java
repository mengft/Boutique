package com.mengft.updateappmanager;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

/*
 * @Author: fantao.meng
 * @Date: 2018/11/30
 *
 *
 */
public class UpdateAppManager extends ReactContextBaseJavaModule {

    public UpdateAppManager(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "UpdateAppManager";
    }

    @ReactMethod
    public void downloadApp(String downloadURLStr) {
        if(downloadURLStr == null || !downloadURLStr.toString().startsWith("http"))
            return;
        UpdateService.Builder.create(downloadURLStr).build(this.getReactApplicationContext());
    }

}
