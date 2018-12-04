package com.mengft.updateappmanager;
/*
 * @Author: fantao.meng
 * @Date: 2018/11/30
 *
 *
 */

public interface UpdateProgressListener {
    /**
     * download start
     */
    public void start();

    /**
     * update download progress
     * @param progress
     */
    public void update(int progress);

    /**
     * download success
     */
    public void success();

    /**
     * download error
     */
    public void error();
}
