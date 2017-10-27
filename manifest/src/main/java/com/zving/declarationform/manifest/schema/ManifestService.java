package com.zving.declarationform.manifest.schema;

import java.util.List;

import com.zving.declarationform.manifest.model.Manifest;
import com.zving.declarationform.model.DeclarationForm;

/**
 * 舱单服务
 * 
 * @author 王育春
 * @mail wyuch@zving.com
 * @date 2017年10月18日
 */
public interface ManifestService {
	String check(DeclarationForm form);

	String tccTry(DeclarationForm form);

	String tccConfirm(DeclarationForm form);

	String tccCancel(DeclarationForm form);

	String add(Manifest manifest);

	String update(Manifest manifest);

	Manifest get(long id);

	String delete(String ids);

	List<Manifest> list();
}
