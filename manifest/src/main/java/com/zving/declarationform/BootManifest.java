package com.zving.declarationform;

import io.servicecomb.foundation.common.utils.BeanUtils;
import io.servicecomb.foundation.common.utils.Log4jUtils;

public class BootManifest {

	public static void main(String[] args) throws Exception {
		Log4jUtils.init();
		BeanUtils.init();
	}
}
