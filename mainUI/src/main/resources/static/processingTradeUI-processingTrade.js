webpackJsonp([11],{

/***/ 180:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(181);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(1)("629ba9ea", content, true);

/***/ }),

/***/ 181:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, ".search-bar[data-v-b7b1383e]{padding-bottom:10px}.main-content-wrap[data-v-b7b1383e]{padding:10px}.file-dialog[data-v-b7b1383e]{text-align:center}", ""]);

// exports


/***/ }),

/***/ 182:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _processingTradeAPI = __webpack_require__(183);

var _processingTradeAPI2 = _interopRequireDefault(_processingTradeAPI);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  data: function data() {
    return {
      clientHeight: 0,
      clientWidth: 0,
      ptListData: [],
      editMode: 1, //新建1，编辑2
      addAndEditDialogIsShow: false,
      fileDialogIsShow: false,
      fileUploadDialogIsShow: false,
      goodsDialogIsShow: false,
      ptSelectedRows: [],
      ptCurrentPage: 1,
      ptPageSizes: [5, 10, 15, 20],
      ptPageSize: 10,
      ptTotal: 30,
      ptDataModel: {
        sku: [],
        amount: '',
        used: '',
        processCompany: '',
        processCompanyName: '',
        commissionedCompnayName: ''
      },
      searchModel: {
        sku: '',
        processCompanyName: '',
        commissionedCompnayName: ''
      },
      ptDataRules: {
        // sku: [{ required: true, message: '该项不能为空', trigger: 'blur' }],
      },
      processCompanyList: [],
      goodsList: [],
      sku: []
    };
  },

  methods: {
    ptOnSelectionChange: function ptOnSelectionChange(selection) {
      this.ptSelectedRows = selection;
    },
    loadProcessingTradeList: function loadProcessingTradeList() {
      var _this = this;

      _processingTradeAPI2.default.getProcessingTradeList(this.ptCurrentPage, this.ptPageSize).then(function (data) {
        _this.ptListData = data;
        if (_this.searchModel.sku !== '') {
          _this.ptListData = _this.ptListData.filter(function (val) {
            return val.sku.indexOf(_this.searchModel.sku) != -1;
          });
        }
        if (_this.searchModel.processCompanyName !== '') {
          _this.ptListData = _this.ptListData.filter(function (val) {
            return val.processCompanyName.indexOf(_this.searchModel.processCompanyName) != -1;
          });
        }
        if (_this.searchModel.commissionedCompnayName !== '') {
          _this.ptListData = _this.ptListData.filter(function (val) {
            return val.commissionedCompnayName.indexOf(_this.searchModel.commissionedCompnayName) != -1;
          });
        }
        _this.ptTotal = _this.ptListData.length;
        _this.ptListData = _this.ptListData.slice((_this.ptCurrentPage - 1) * _this.ptPageSize, _this.ptPageSize * _this.ptCurrentPage);
        _this.dealSKU();
      });
    },
    dealSKU: function dealSKU() {
      var _this2 = this;

      this.ptListData.forEach(function (value) {
        _this2.sku = value.sku.split(',');
      }, this);
    },
    ptAddClick: function ptAddClick() {
      this.loadCompanyList();
      this.loadGoodsList();
      this.editMode = 1;
      this.sku = [];
      this.ptDataModel = {
        id: '',
        sku: [],
        amount: '',
        used: '',
        processCompany: '',
        processCompanyName: '',
        commissionedCompnayName: ''
      };
      this.addAndEditDialogIsShow = true;
    },
    ptEditClick: function ptEditClick() {
      this.loadCompanyList();
      this.loadGoodsList();
      this.editMode = 2;
      this.ptDataModel = Object.assign({}, this.ptSelectedRows[0]);
      this.sku = this.ptDataModel.sku.split(',');
      this.addAndEditDialogIsShow = true;
    },

    //双击
    dbptEditClick: function dbptEditClick(row) {
      this.loadCompanyList();
      this.loadGoodsList();
      this.editMode = 2;
      this.ptDataModel = Object.assign({}, row);
      this.sku = this.ptDataModel.sku.split(',');
      this.addAndEditDialogIsShow = true;
    },
    loadCompanyList: function loadCompanyList() {
      var _this3 = this;

      _processingTradeAPI2.default.getCompanyList().then(function (data) {
        _this3.processCompanyList = data;
      });
    },
    loadGoodsList: function loadGoodsList() {
      var _this4 = this;

      _processingTradeAPI2.default.getGoodsList().then(function (data) {
        _this4.goodsList = data;
      });
    },
    ptDelClick: function ptDelClick() {
      var _this5 = this;

      this.$confirm('确定删除吗，删除后无法恢复。是否继续删除？', '删除确认', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function () {
        var rowIds = [];
        _this5.ptSelectedRows.forEach(function (row) {
          rowIds.push(row.id);
        });
        return rowIds;
      }).then(function (ids) {
        if (!ids) {
          return;
        }
        _processingTradeAPI2.default.deleteDataList(ids).then(function (data) {
          _this5.ptSelectedRows = [];
          if (data === 1) {
            _this5.ptListData = _this5.ptListData.filter(function (val) {
              return !ids.includes(val.id);
            });
            _this5.loadProcessingTradeList();
            _this5.ptTotal = _this5.ptTotal - ids.length;
            _this5.$notify.success({
              title: '成功',
              message: '删除成功',
              duration: 2000
            });
          } else {
            _this5.$notify.fail({
              title: '失败',
              message: '删除失败',
              duration: 2000
            });
          }
        });
      });
    },
    ptViewGoodsClick: function ptViewGoodsClick() {
      var skus = this.ptSelectedRows[0].sku.split(',');
      this.goodsList = this.goodsList.filter(function (val) {
        var flag = false;
        var goodsno = val.sn;
        skus.forEach(function (value) {
          flag = value === goodsno || flag;
        });
        return flag;
      });
      this.goodsDialogIsShow = true;
    },
    contractFileView: function contractFileView() {
      this.fileDialogIsShow = true;
    },
    materialFileView: function materialFileView() {
      this.fileDialogIsShow = true;
    },
    feclarationFileView: function feclarationFileView() {
      this.fileDialogIsShow = true;
    },
    addAndEditOkHandler: function addAndEditOkHandler() {
      var _this6 = this;

      var validateForm = function validateForm() {
        return new Promise(function (resolve, reject) {
          _this6.$refs['ptDataRef'].validate(function (valid) {
            if (valid) {
              return resolve(true);
            }
            return reject(false);
          });
        });
      };

      var addForm = function addForm() {
        _this6.ptDataModel.id = Math.round(Math.random() * 10000);
        _this6.ptDataModel.sku = _this6.sku.join(',');
        return _processingTradeAPI2.default.addFormData(_this6.ptDataModel).then(function (data) {
          _this6.loadProcessingTradeList();
          return data;
        });
      };

      var editForm = function editForm() {
        _this6.ptDataModel.sku = _this6.sku.join(',');
        return _processingTradeAPI2.default.editFormData(_this6.ptDataModel).then(function (data) {
          _this6.loadProcessingTradeList();
          return data;
        });
      };

      validateForm().then(function () {
        if (_this6.editMode === 1) {
          return addForm();
        }
        if (_this6.editMode === 2) {
          return editForm();
        }
      }).then(function (res) {
        if (res === 1) {
          _this6.addAndEditDialogIsShow = false;
          _this6.$notify({
            title: '成功',
            message: '保存成功',
            type: 'success',
            duration: 2000
          });
        } else {
          _this6.$notify.error({
            title: '失败',
            message: '保存失败',
            duration: 2000
          });
        }
      }).catch(function (e) {
        console.log(e);
        _this6.$notify.error({
          title: '输入错误',
          message: '没有正确填写表单项！',
          duration: 2000
        });
      });
    },
    onProcessCompanyChange: function onProcessCompanyChange(val1) {
      var _this7 = this;

      this.processCompanyList.forEach(function (value) {
        if (value.name === val1) {
          _this7.ptDataModel.processCompany = value.id;
        }
      }, this);
    },
    fileViewOkHandler: function fileViewOkHandler() {
      this.fileDialogIsShow = false;
      this.$notify({
        title: '成功',
        message: '保存成功',
        type: 'success',
        duration: 2000
      });
    },
    ptHandleSizeChange: function ptHandleSizeChange(val) {
      this.ptPageSize = val;
      this.loadProcessingTradeList();
    },
    ptHandleCurrentChange: function ptHandleCurrentChange(val) {
      this.ptCurrentPage = val;
      this.loadProcessingTradeList();
    }
  },
  created: function created() {
    this.loadProcessingTradeList();
    this.loadGoodsList();
    this.clientHeight = document.documentElement.clientHeight - 270;
    this.clientWidth = document.documentElement.clientWidth - 250;
    var num = Math.floor(this.clientHeight / 40) - 1;
    this.ptPageSize = Math.floor(num / 5) * 5;
    this.ptPageSizes = [this.ptPageSize, this.ptPageSize * 2, this.ptPageSize * 4];
  }
}; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/***/ }),

/***/ 183:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var processingTradeAPI = {
  getProcessingTradeList: function getProcessingTradeList(pageIndex, pageSize) {
    return axios.get('/processingTrade/processingtrade').then(function (res) {
      return res.data;
    });
  },
  addFormData: function addFormData(model) {
    return axios.post('/processingTrade/processingtrade', model).then(function (res) {
      return res.data;
    });
  },
  editFormData: function editFormData(model) {
    return axios.put('/processingTrade/processingtrade', model).then(function (res) {
      return res.data;
    });
  },
  deleteDataList: function deleteDataList(ids) {
    var strIds = ids.join(',');
    return axios.delete('/processingTrade/processingtrade/' + strIds).then(function (res) {
      return res.data;
    });
  },
  getCompanyList: function getCompanyList() {
    return axios.get('/baseData/company').then(function (res) {
      return res.data;
    });
  },
  getGoodsList: function getGoodsList() {
    return axios.get('/baseData/sku', { params: { searchWord: '' } }).then(function (res) {
      return res.data;
    });
  }
};

exports.default = processingTradeAPI;

/***/ }),

/***/ 184:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('el-toolbar', [_c('el-button', {
    on: {
      "click": _vm.ptAddClick
    }
  }, [_c('i', {
    staticClass: "fa fa-plus",
    attrs: {
      "aria-hidden": "true"
    }
  }), _vm._v(" 新建")]), _vm._v(" "), _c('el-button', {
    attrs: {
      "disabled": _vm.ptSelectedRows.length !== 1
    },
    on: {
      "click": _vm.ptEditClick
    }
  }, [_c('i', {
    staticClass: "fa fa-edit",
    attrs: {
      "aria-hidden": "true"
    }
  }), _vm._v(" 编辑")]), _vm._v(" "), _c('el-button', {
    attrs: {
      "disabled": _vm.ptSelectedRows.length < 1
    },
    on: {
      "click": _vm.ptDelClick
    }
  }, [_c('i', {
    staticClass: "fa fa-trash-o",
    attrs: {
      "aria-hidden": "true"
    }
  }), _vm._v(" 删除")]), _vm._v(" "), _c('el-button', {
    attrs: {
      "disabled": _vm.ptSelectedRows.length !== 1
    },
    on: {
      "click": _vm.ptViewGoodsClick
    }
  }, [_c('i', {
    staticClass: "fa fa-eye",
    attrs: {
      "aria-hidden": "true"
    }
  }), _vm._v(" 查看商品")])], 1), _vm._v(" "), _c('div', {
    staticClass: "main-content-wrap"
  }, [_c('div', {
    staticClass: "search-bar fr"
  }, [_vm._v("\n         货号:\n      "), _c('el-input', {
    staticStyle: {
      "width": "150px"
    },
    attrs: {
      "type": "text",
      "size": "small"
    },
    model: {
      value: (_vm.searchModel.sku),
      callback: function($$v) {
        _vm.$set(_vm.searchModel, "sku", $$v)
      },
      expression: "searchModel.sku"
    }
  }), _vm._v("\n         接单企业:\n      "), _c('el-input', {
    staticStyle: {
      "width": "150px"
    },
    attrs: {
      "type": "text",
      "size": "small"
    },
    model: {
      value: (_vm.searchModel.processCompanyName),
      callback: function($$v) {
        _vm.$set(_vm.searchModel, "processCompanyName", $$v)
      },
      expression: "searchModel.processCompanyName"
    }
  }), _vm._v("\n         委托企业:\n      "), _c('el-input', {
    staticStyle: {
      "width": "150px"
    },
    attrs: {
      "type": "text",
      "size": "small"
    },
    model: {
      value: (_vm.searchModel.commissionedCompnayName),
      callback: function($$v) {
        _vm.$set(_vm.searchModel, "commissionedCompnayName", $$v)
      },
      expression: "searchModel.commissionedCompnayName"
    }
  }), _vm._v("\n         \n      "), _c('el-button', {
    staticStyle: {
      "width": "60px"
    },
    attrs: {
      "type": "primary",
      "size": "small"
    },
    on: {
      "click": _vm.loadProcessingTradeList
    }
  }, [_vm._v("搜索")])], 1), _vm._v(" "), _c('el-table', {
    ref: "ptListTable",
    staticClass: "content-table",
    attrs: {
      "highlight-current-row": "",
      "data": _vm.ptListData,
      "tooltip-effect": "dark"
    },
    on: {
      "selection-change": _vm.ptOnSelectionChange,
      "row-dblclick": _vm.dbptEditClick
    }
  }, [_c('el-table-column', {
    attrs: {
      "type": "selection",
      "width": "55",
      "align": "center"
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "type": "expand"
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function(props) {
        return [_c('el-form', {
          staticClass: "demo-table-expand",
          attrs: {
            "label-position": "left",
            "inline": "",
            "label-width": "80px"
          }
        }, [_c('el-form-item', {
          staticStyle: {
            "width": "50%"
          },
          attrs: {
            "label": "货号"
          }
        }, [_c('span', [_vm._v(_vm._s(props.row.sku))])]), _vm._v(" "), _c('el-form-item', {
          attrs: {
            "label": "限额"
          }
        }, [_c('span', [_vm._v(_vm._s(props.row.amount))])]), _vm._v(" "), _c('el-form-item', {
          staticStyle: {
            "width": "50%"
          },
          attrs: {
            "label": "己用量"
          }
        }, [_c('span', [_vm._v(_vm._s(props.row.used))])]), _vm._v(" "), _c('el-form-item', {
          attrs: {
            "label": "接单企业"
          }
        }, [_c('span', [_vm._v(_vm._s(props.row.processCompanyName))])]), _vm._v(" "), _c('el-form-item', {
          staticStyle: {
            "width": "50%"
          },
          attrs: {
            "label": "委托企业"
          }
        }, [_c('span', [_vm._v(_vm._s(props.row.commissionedCompnayName))])]), _vm._v(" "), _c('el-form-item', {
          attrs: {
            "label": "合同备案"
          }
        }, [_c('span', [_c('el-button', {
          attrs: {
            "type": "text"
          },
          nativeOn: {
            "click": function($event) {
              $event.preventDefault();
              _vm.contractFileView($event)
            }
          }
        }, [_vm._v("\n                  查看文件\n                ")])], 1)]), _vm._v(" "), _c('el-form-item', {
          staticStyle: {
            "width": "50%"
          },
          attrs: {
            "label": "料件备案"
          }
        }, [_c('span', [_c('el-button', {
          attrs: {
            "type": "text"
          },
          nativeOn: {
            "click": function($event) {
              $event.preventDefault();
              _vm.materialFileView($event)
            }
          }
        }, [_vm._v("\n                  查看文件\n                ")])], 1)]), _vm._v(" "), _c('el-form-item', {
          attrs: {
            "label": "报关单"
          }
        }, [_c('span', [_c('el-button', {
          attrs: {
            "type": "text"
          },
          nativeOn: {
            "click": function($event) {
              $event.preventDefault();
              _vm.feclarationFileView($event)
            }
          }
        }, [_vm._v("\n                  查看文件\n                ")])], 1)])], 1)]
      }
    }])
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "sku",
      "label": "货号",
      "width": ""
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function(scope) {
        return [_c('a', {
          staticClass: "a-btn",
          on: {
            "click": function($event) {
              _vm.dbptEditClick(scope.row)
            }
          }
        }, [_vm._v(_vm._s(scope.row.sku))])]
      }
    }])
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "amount",
      "label": "限额",
      "width": ""
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "used",
      "label": "己用量",
      "width": ""
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "processCompanyName",
      "label": "接单企业",
      "width": ""
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "commissionedCompnayName",
      "label": "委托企业",
      "width": ""
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "label": "合同备案",
      "width": ""
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function(scope) {
        return [_c('el-button', {
          attrs: {
            "type": "text"
          },
          nativeOn: {
            "click": function($event) {
              $event.preventDefault();
              _vm.contractFileView($event)
            }
          }
        }, [_vm._v("\n            查看文件\n          ")])]
      }
    }])
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "",
      "label": "料件备案",
      "width": ""
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function(scope) {
        return [_c('el-button', {
          attrs: {
            "type": "text"
          },
          nativeOn: {
            "click": function($event) {
              $event.preventDefault();
              _vm.materialFileView($event)
            }
          }
        }, [_vm._v("\n            查看文件\n          ")])]
      }
    }])
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "",
      "label": "报关单",
      "width": ""
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function(scope) {
        return [_c('el-button', {
          attrs: {
            "type": "text"
          },
          nativeOn: {
            "click": function($event) {
              $event.preventDefault();
              _vm.feclarationFileView($event)
            }
          }
        }, [_vm._v("\n            查看文件\n          ")])]
      }
    }])
  })], 1), _vm._v(" "), _c('div', {
    staticClass: "fr",
    staticStyle: {
      "margin-top": "10px"
    }
  }, [_c('el-pagination', {
    attrs: {
      "current-page": _vm.ptCurrentPage,
      "page-sizes": _vm.ptPageSizes,
      "page-size": _vm.ptPageSize,
      "total": _vm.ptTotal,
      "layout": "total, sizes, prev, pager, next"
    },
    on: {
      "size-change": _vm.ptHandleSizeChange,
      "current-change": _vm.ptHandleCurrentChange
    }
  })], 1)], 1), _vm._v(" "), _c('el-dialog', {
    attrs: {
      "title": _vm.editMode === 1 ? '新建' : '编辑',
      "visible": _vm.addAndEditDialogIsShow
    },
    on: {
      "update:visible": function($event) {
        _vm.addAndEditDialogIsShow = $event
      }
    }
  }, [_c('el-form', {
    ref: "ptDataRef",
    staticStyle: {
      "height": "400px",
      "overflow-y": "scroll",
      "overflow-x": "hidden"
    },
    attrs: {
      "model": _vm.ptDataModel,
      "rules": _vm.ptDataRules,
      "label-width": "160px"
    }
  }, [_c('el-form-item', {
    attrs: {
      "label": "货号",
      "prop": "sku"
    }
  }, [_c('el-select', {
    staticClass: "businesstype-select",
    staticStyle: {
      "width": "320px"
    },
    attrs: {
      "filterable": "",
      "multiple": ""
    },
    on: {
      "change": _vm.onProcessCompanyChange
    },
    model: {
      value: (_vm.sku),
      callback: function($$v) {
        _vm.sku = $$v
      },
      expression: "sku"
    }
  }, _vm._l((_vm.goodsList), function(item) {
    return _c('el-option', {
      key: item.sn,
      attrs: {
        "label": item.sn,
        "value": item.sn
      }
    }, [_c('span', {
      staticStyle: {
        "float": "left"
      }
    }, [_vm._v(_vm._s(item.sn))]), _vm._v(" "), _c('span', {
      staticStyle: {
        "float": "right",
        "color": "#8492a6",
        "font-size": "13px",
        "margin-right": "20px"
      }
    }, [_vm._v(_vm._s(item.name))])])
  }))], 1), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "label": "限额",
      "prop": "amount"
    }
  }, [_c('el-input-number', {
    staticStyle: {
      "width": "320px"
    },
    attrs: {
      "min": 0
    },
    model: {
      value: (_vm.ptDataModel.amount),
      callback: function($$v) {
        _vm.$set(_vm.ptDataModel, "amount", $$v)
      },
      expression: "ptDataModel.amount"
    }
  })], 1), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "label": "己用量",
      "prop": "used"
    }
  }, [_c('el-input-number', {
    staticStyle: {
      "width": "320px"
    },
    attrs: {
      "min": 0
    },
    model: {
      value: (_vm.ptDataModel.used),
      callback: function($$v) {
        _vm.$set(_vm.ptDataModel, "used", $$v)
      },
      expression: "ptDataModel.used"
    }
  })], 1), _vm._v(" "), _c('el-form-item', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (false),
      expression: "false"
    }],
    attrs: {
      "label": "接单企业ID",
      "prop": "processCompany"
    }
  }, [_c('el-input', {
    staticStyle: {
      "width": "320px"
    },
    attrs: {
      "type": "text",
      "auto-complete": "off"
    },
    model: {
      value: (_vm.ptDataModel.processCompany),
      callback: function($$v) {
        _vm.$set(_vm.ptDataModel, "processCompany", $$v)
      },
      expression: "ptDataModel.processCompany"
    }
  })], 1), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "label": "接单企业",
      "prop": "processCompanyName"
    }
  }, [_c('el-select', {
    staticClass: "businesstype-select",
    staticStyle: {
      "width": "320px"
    },
    attrs: {
      "multiple": false
    },
    on: {
      "change": _vm.onProcessCompanyChange
    },
    model: {
      value: (_vm.ptDataModel.processCompanyName),
      callback: function($$v) {
        _vm.$set(_vm.ptDataModel, "processCompanyName", $$v)
      },
      expression: "ptDataModel.processCompanyName"
    }
  }, _vm._l((_vm.processCompanyList), function(item) {
    return _c('el-option', {
      key: item.name,
      attrs: {
        "label": item.name,
        "value": item.name
      }
    })
  }))], 1), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "label": "委托企业",
      "prop": "commissionedCompnayName"
    }
  }, [_c('el-input', {
    staticStyle: {
      "width": "320px"
    },
    attrs: {
      "type": "text",
      "auto-complete": "off"
    },
    model: {
      value: (_vm.ptDataModel.commissionedCompnayName),
      callback: function($$v) {
        _vm.$set(_vm.ptDataModel, "commissionedCompnayName", $$v)
      },
      expression: "ptDataModel.commissionedCompnayName"
    }
  })], 1), _vm._v(" "), _c('el-form-item', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.editMode === 1),
      expression: "editMode===1"
    }],
    attrs: {
      "label": "合同备案",
      "prop": "contract"
    }
  }, [_c('el-upload', {
    staticClass: "upload-file",
    attrs: {
      "on-success": _vm.onUploadSuccess,
      "action": "",
      "multiple": false,
      "file-list": _vm.fileList
    }
  }, [_c('el-button', {
    attrs: {
      "size": "small",
      "type": "primary"
    }
  }, [_vm._v("点击上传")])], 1)], 1), _vm._v(" "), _c('el-form-item', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.editMode === 1),
      expression: "editMode===1"
    }],
    attrs: {
      "label": "料件备案",
      "prop": "material"
    }
  }, [_c('el-upload', {
    staticClass: "upload-file",
    attrs: {
      "on-success": _vm.onUploadSuccess,
      "action": "",
      "multiple": false,
      "file-list": _vm.fileList
    }
  }, [_c('el-button', {
    attrs: {
      "size": "small",
      "type": "primary"
    }
  }, [_vm._v("点击上传")])], 1)], 1), _vm._v(" "), _c('el-form-item', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.editMode === 1),
      expression: "editMode===1"
    }],
    attrs: {
      "label": "报关单",
      "prop": "feclaration"
    }
  }, [_c('el-upload', {
    staticClass: "upload-file",
    attrs: {
      "on-success": _vm.onUploadSuccess,
      "action": "",
      "multiple": false,
      "file-list": _vm.fileList
    }
  }, [_c('el-button', {
    attrs: {
      "size": "small",
      "type": "primary"
    }
  }, [_vm._v("点击上传")])], 1)], 1), _vm._v(" "), _c('el-form-item', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.editMode === 2),
      expression: "editMode===2"
    }],
    attrs: {
      "label": "合同备案"
    }
  }, [_c('el-button', {
    nativeOn: {
      "click": function($event) {
        $event.preventDefault();
        _vm.contractFileView($event)
      }
    }
  }, [_vm._v("\n          查看文件\n        ")])], 1), _vm._v(" "), _c('el-form-item', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.editMode === 2),
      expression: "editMode===2"
    }],
    attrs: {
      "label": "料件备案"
    }
  }, [_c('el-button', {
    nativeOn: {
      "click": function($event) {
        $event.preventDefault();
        _vm.materialFileView($event)
      }
    }
  }, [_vm._v("\n          查看文件\n        ")])], 1), _vm._v(" "), _c('el-form-item', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.editMode === 2),
      expression: "editMode===2"
    }],
    attrs: {
      "label": "报关单"
    }
  }, [_c('el-button', {
    nativeOn: {
      "click": function($event) {
        $event.preventDefault();
        _vm.feclarationFileView($event)
      }
    }
  }, [_vm._v("\n          查看文件\n        ")])], 1)], 1), _vm._v(" "), _c('div', {
    attrs: {
      "slot": "footer"
    },
    slot: "footer"
  }, [_c('el-button', {
    on: {
      "click": function($event) {
        _vm.addAndEditDialogIsShow = false
      }
    }
  }, [_vm._v("取 消")]), _vm._v(" "), _c('el-button', {
    attrs: {
      "type": "primary"
    },
    on: {
      "click": _vm.addAndEditOkHandler
    }
  }, [_vm._v("确 定")])], 1)], 1), _vm._v(" "), _c('el-dialog', {
    staticClass: "file-dialog",
    attrs: {
      "title": '文件查看',
      "visible": _vm.fileDialogIsShow
    },
    on: {
      "update:visible": function($event) {
        _vm.fileDialogIsShow = $event
      }
    }
  }, [_c('img', {
    style: ({
      height: 900 + 'px',
      overflowY: 'scroll',
      overflowX: 'hidden',
      paddingRight: '15px'
    }),
    attrs: {
      "src": "http://www.qingshengjiuye.com/UploadFiles/201610271722212414737.jpg"
    }
  })]), _vm._v(" "), _c('el-dialog', {
    attrs: {
      "title": '商品信息',
      "visible": _vm.goodsDialogIsShow
    },
    on: {
      "update:visible": function($event) {
        _vm.goodsDialogIsShow = $event
      }
    }
  }, [_c('div', {
    staticClass: "main-content-wrap"
  }, [_c('el-table', {
    ref: "goodsListTable",
    attrs: {
      "highlight-current-row": "",
      "data": _vm.goodsList,
      "tooltip-effect": "dark"
    },
    on: {
      "selection-change": _vm.goodsOnSelectionChange
    }
  }, [_c('el-table-column', {
    attrs: {
      "min-width": "4%",
      "label": "编号",
      "prop": "sn"
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "min-width": "4%",
      "label": "商品类型",
      "prop": "goodsType"
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "min-width": "4%",
      "label": "商品名称",
      "prop": "name"
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "min-width": "4%",
      "label": "商品规格",
      "prop": "spec"
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "min-width": "4%",
      "label": "商品单位",
      "prop": "unit"
    }
  })], 1)], 1), _vm._v(" "), _c('div', {
    attrs: {
      "slot": "footer"
    },
    slot: "footer"
  }, [_c('el-button', {
    attrs: {
      "type": "primary"
    },
    on: {
      "click": function($event) {
        _vm.goodsDialogIsShow = false
      }
    }
  }, [_vm._v("确 定")])], 1)])], 1)
},staticRenderFns: []}

/***/ }),

/***/ 99:
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(180)
}
var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(182),
  /* template */
  __webpack_require__(184),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-b7b1383e",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ })

});