function pickerDateRange(inputId, options) {
    var defaults = {
        aToday: 'aToday',
        aYesterday: 'aYesterday',
        aRecent7Days: 'aRecent7Days',
        aRecent30Days: 'aRecent30Days',
        startDate: '',
        endDate: '',
        startCompareDate: '',
        endCompareDate: '',
        success: function (obj) {
            return true;
        },
        startDateId: 'startDate',
        startCompareDateId: 'startCompareDate',
        endDateId: 'endDate',
        endCompareDateId: 'endCompareDate',
        target: '',
        needCompare: false,
        suffix: '',
        inputTrigger: 'input_trigger',
        compareTrigger: 'compare_trigger',
        compareCheckboxId: 'needCompare',
        calendars: 2,
        dayRangeMax: 0,
        monthRangeMax: 12,
        dateTable: 'dateRangeDateTable',
        selectCss: 'current',
        firstCss: 'first',
        lastCss: 'last',
        clickCss: 'today',
        compareCss: 'current',
        coincideCss: 'dateRangeCoincide',
        disableGray: 'dis',
        isToday: 'dateRangeToday',
        joinLineId: 'joinLine',
        isSingleDay: false,
        defaultText: ' 至 ',
        singleCompare: false,
        stopToday: true,
        rangeTableId: 'range_table',
        isTodayValid: false,
        noCalendar: false,
        exportFileId: 'exportFile',
        validStartTime: 978278400
    };
    var __method = this;
    this.periodObj = {
        aToday: 0,
        aYesterday: 1,
        aRecent7Days: 6,
        aRecent30Days: 29
    };
    this.rangeObj = {
        cbRangeHour: 'range_hour',
        cbRangeDay: 'range_day',
        cbRangeWeek: 'range_week',
        cbRangeMonth: 'range_month'
    };
    this.oprtDic = {
        SUBMIT: 1,
        INIT: 2,
        CLOSE: 3
    };
    this.sourceId = '';
    this.inputId = inputId;
    this.inputCompareId = inputId + 'Compare';
    this.compareInputDiv = 'div_compare_' + inputId;
    this.mOpts = $.extend({}, defaults, options);
    this.startDefDate = '';
    this.isHourStats = (undefined != $('#' + this.rangeObj.cbRangeHour).val());
    var suffix = '' == this.mOpts.suffix ? (new Date()).getTime() : this.mOpts.suffix;
    this.calendarId = 'calendar_' + suffix;
    this.dateListId = 'dateRangePicker_' + suffix;
    this.dateRangeCompareDiv = 'dateRangeCompareDiv_' + suffix;
    this.dateRangeDiv = 'dateRangeDiv_' + suffix;
    this.compareCheckBoxDiv = 'dateRangeCompareCheckBoxDiv_' + suffix;
    this.submitBtn = 'submit_' + suffix;
    this.closeBtn = 'closeBtn_' + suffix;
    this.preMonth = 'dateRangePreMonth_' + suffix;
    this.nextMonth = 'dateRangeNextMonth_' + suffix;
    this.startDateId = this.mOpts.startDateId + '_' + suffix;
    this.endDateId = this.mOpts.endDateId + '_' + suffix;
    this.compareCheckboxId = this.mOpts.compareCheckboxId + '_' + suffix;
    this.startCompareDateId = this.mOpts.startCompareDateId + '_' + suffix;
    this.endCompareDateId = this.mOpts.endCompareDateId + '_' + suffix;
    var wrapper = ['<div id="' + this.calendarId + '" class="calendar calendar2 cf">', '<div class="calendar_cont cf" id="' + this.dateListId + '">', '</div>', '<div class="calendar_footer cf">', '<div class="frm_msg">', '<div id="' + this.dateRangeDiv + '">', '<input type="text" class="ipt_text_s input-small" name="' + this.startDateId + '" id="' + this.startDateId + '" value="' + this.mOpts.startDate + '" readonly />', '<span class="' + this.mOpts.joinLineId + '"> - </span>', '<input type="text" class="ipt_text_s input-small" name="' + this.endDateId + '" id="' + this.endDateId + '" value="' + this.mOpts.endDate + '" readonly /><br />', '</div>', '<div id="' + this.dateRangeCompareDiv + '">', '<input type="text" class="ipt_text_s input-small" name="' + this.startCompareDateId + '" id="' + this.startCompareDateId + '" value="' + this.mOpts.startCompareDate + '" readonly />', '<span class="' + this.mOpts.joinLineId + '"> - </span>', '<input type="text" class="ipt_text_s input-small" name="' + this.endCompareDateId + '" id="' + this.endCompareDateId + '" value="' + this.mOpts.endCompareDate + '" readonly />', '</div>', '</div>', '<div class="frm_btn">', '<input class="btn_sbm btn btn-primary" type="button" name="' + this.submitBtn + '" id="' + this.submitBtn + '" value="确定" />', '<input class="btn_rst btn" type="button" id="' + this.closeBtn + '" value="取消"/>', '</div>', '</div>', '</div>'];
    var checkBoxWrapper = ['<label class="contrast" for ="' + this.compareCheckboxId + '">', '<input type="checkbox" class="pc" name="' + this.compareCheckboxId + '" id="' + this.compareCheckboxId + '" value="1"/>对比', '</label>', '<div class="date" id="' + this.compareInputDiv + '">', ' <span name="dateCompare" id="' + this.inputCompareId + '" class="date_title"></span>', ' <a class="opt_sel" id="' + this.mOpts.compareTrigger + '" href="#">', '  <i class="i_orderd"></i>', ' </a>', '</div>'];
    $(checkBoxWrapper.join('')).insertAfter($('#div_' + this.inputId));
    if (this.mOpts.noCalendar) {
        $('#' + this.inputId).css('display', 'none');
    }
    $(0 < $('#appendParent').length ? '#appendParent' : document.body).append(wrapper.join(''));
    $('#' + this.calendarId).css('z-index', 9999);
    if (1 > $('#' + this.mOpts.startDateId).length) {
        $('#' + this.mOpts.target).append('<input type="hidden" id="' + this.mOpts.startDateId + '" name="' + this.mOpts.startDateId + '" value="' + this.mOpts.startDate + '" />');
    } else {
        $('#' + this.mOpts.startDateId).val(this.mOpts.startDate);
    }
    if (1 > $('#' + this.mOpts.endDateId).length) {
        $('#' + this.mOpts.target).append('<input type="hidden" id="' + this.mOpts.endDateId + '" name="' + this.mOpts.endDateId + '" value="' + this.mOpts.endDate + '" />');
    } else {
        $('#' + this.mOpts.endDateId).val(this.mOpts.endDate);
    }
    if (1 > $('#' + this.mOpts.compareCheckboxId).length) {
        $('#' + this.mOpts.target).append('<input type="checkbox" id="' + this.mOpts.compareCheckboxId + '" name="' + this.mOpts.compareCheckboxId + '" value="' + (this.mOpts.needCompare ? 1 : 0) + '" style="display:none;" />');
    }
    if (false == this.mOpts.needCompare) {
        $('#' + this.compareInputDiv).css('display', 'none');
        $('#' + this.compareCheckboxId).attr('disabled', true);
        $('#' + this.startCompareDateId).attr('disabled', true);
        $('#' + this.endCompareDateId).attr('disabled', true);
        $('#' + this.compareCheckboxId).parent().css('display', 'none');
    } else {
        if (1 > $('#' + this.mOpts.startCompareDateId).length) {
            $('#' + this.mOpts.target).append('<input type="hidden" id="' + this.mOpts.startCompareDateId + '" name="' + this.mOpts.startCompareDateId + '" value="' + this.mOpts.startCompareDate + '" />');
        } else {
            $('#' + this.mOpts.startCompareDateId).val(this.mOpts.startCompareDate);
        }
        if (1 > $('#' + this.mOpts.endCompareDateId).length) {
            $('#' + this.mOpts.target).append('<input type="hidden" id="' + this.mOpts.endCompareDateId + '" name="' + this.mOpts.endCompareDateId + '" value="' + this.mOpts.endCompareDate + '" />');
        } else {
            $('#' + this.mOpts.endCompareDateId).val(this.mOpts.endCompareDate);
        }
        if ('' == this.mOpts.startCompareDate || '' == this.mOpts.endCompareDate) {
            $('#' + this.compareCheckboxId).attr('checked', false);
            $('#' + this.mOpts.compareCheckboxId).attr('checked', false);
        } else {
            $('#' + this.compareCheckboxId).attr('checked', true);
            $('#' + this.mOpts.compareCheckboxId).attr('checked', true);
        }
    }
    this.dateInput = this.startDateId;
    this.changeInput(this.dateInput);
    $('#' + this.startDateId).bind('click', function () {
        if (__method.endCompareDateId == __method.dateInput) {
            $('#' + __method.startCompareDateId).val(__method.startDefDate);
        }
        __method.startDefDate = '';
        __method.removeCSS(1);
        __method.changeInput(__method.startDateId);
        return false;
    });
    $('#' + this.calendarId).bind('click', function (event) {
        event.stopPropagation();
    });
    $('#' + this.startCompareDateId).bind('click', function () {
        if (__method.endDateId == __method.dateInput) {
            $('#' + __method.startDateId).val(__method.startDefDate);
        }
        __method.startDefDate = '';
        __method.removeCSS(0);
        __method.changeInput(__method.startCompareDateId);
        return false;
    });
    $('#' + this.submitBtn).bind('click', function () {
        __method.close(__method.oprtDic.SUBMIT);
        __method.sourceId = this.id;
        __method.mOpts.success(__method);
        return false;
    });
    $('#' + this.closeBtn).bind('click', function () {
        __method.close(__method.oprtDic.CLOSE);
        return false;
    });
    $('#' + this.inputId).bind('click', function () {
        __method.init();
        __method.show(false, __method);
        return false;
    });
    $('#' + this.mOpts.inputTrigger).bind('click', function () {
        __method.init();
        __method.show(false, __method);
        return false;
    });
    $('#' + this.inputCompareId).bind('click', function () {
        __method.init(true);
        __method.show(true, __method);
        return false;
    });
    $('#' + this.mOpts.compareTrigger).bind('click', function () {
        __method.init(true);
        __method.show(true, __method);
        return false;
    });
    if (this.mOpts.singleCompare) {
        $('#' + this.compareCheckboxId).attr('checked', true);
        $('#' + this.mOpts.compareCheckboxId).attr('checked', true);
        $('#' + __method.startDateId).val(__method.mOpts.startDate);
        $('#' + __method.endDateId).val(__method.mOpts.startDate);
        $('#' + __method.startCompareDateId).val(__method.mOpts.startCompareDate);
        $('#' + __method.endCompareDateId).val(__method.mOpts.startCompareDate);
    }
    $('#' + this.compareInputDiv).css('display', $('#' + this.compareCheckboxId).attr('checked') ? '' : 'none');
    $('#' + this.compareCheckboxId).bind('click', function () {
        $('#' + __method.compareInputDiv).css('display', this.checked ? '' : 'none');
        $('#' + __method.compareInputDiv).css('display', this.checked ? '' : 'none');
        $('#' + __method.startCompareDateId).css('disabled', this.checked ? false : true);
        $('#' + __method.endCompareDateId).css('disabled', this.checked ? false : true);
        $('#' + __method.mOpts.compareCheckboxId).attr('checked', $('#' + __method.compareCheckboxId).attr('checked'));
        $('#' + __method.mOpts.compareCheckboxId).val($('#' + __method.compareCheckboxId).attr('checked') ? 1 : 0);
        if ($('#' + __method.compareCheckboxId).attr('checked')) {
            sDate = __method.str2date($('#' + __method.startDateId).val());
            sTime = sDate.getTime();
            eDate = __method.str2date($('#' + __method.endDateId).val());
            eTime = eDate.getTime();
            scDate = $('#' + __method.startCompareDateId).val();
            ecDate = $('#' + __method.endCompareDateId).val();
            if ('' == scDate || '' == ecDate || ((true == __method.mOpts.singleCompare || true == __method.mOpts.isSingleDay) && __method.str2date(scDate).getTime() == sTime)) {
                ecDate = __method.str2date(__method.date2ymd(sDate).join('-'));
                ecDate.setDate(ecDate.getDate() - 1);
                scDate = __method.str2date(__method.date2ymd(sDate).join('-'));
                scDate.setDate(scDate.getDate() - ((eTime - sTime) / 86400000) - 1);
                if (ecDate.getTime() < __method.mOpts.validStartTime * 1000) {
                    scDate = sDate;
                    ecDate = eDate;
                }
                if (ecDate.getTime() >= __method.mOpts.validStartTime * 1000 && scDate.getTime() < __method.mOpts.validStartTime * 1000) {
                    scDate.setTime(__method.mOpts.validStartTime * 1000)
                    scDate = __method.str2date(__method.date2ymd(scDate).join('-'));
                    ecDate.setDate(scDate.getDate() + ((eTime - sTime) / 86400000) - 1);
                }
                $('#' + __method.startCompareDateId).val(__method.formatDate(__method.date2ymd(scDate).join('-')));
                $('#' + __method.endCompareDateId).val(__method.formatDate(__method.date2ymd(ecDate).join('-')));
            }
            __method.addCSS(1);
            __method.changeInput(__method.startCompareDateId);
        } else {
            __method.removeCSS(1);
            __method.changeInput(__method.startDateId);
        }
        __method.sourceId = this.id;
        __method.close(__method.oprtDic.INIT);
        __method.mOpts.success(__method);
    });
    $(document).bind('click', function () {
        __method.close(__method.oprtDic.CLOSE);
    });
    this.init();
    this.close(this.oprtDic.INIT);
};
pickerDateRange.prototype.init = function (isCompare) {
    var __method = this;
    $("div[id^='calendar_']").each(function () {
        ($(this).attr('id') != __method.calendarId) && $(this).remove()
    });
    var minDate, maxDate;
    var isNeedCompare = typeof (isCompare) != 'undefined' ? isCompare && $("#" + __method.compareCheckboxId).attr('checked') : $("#" + __method.compareCheckboxId).attr('checked');
    $("#" + this.dateListId).empty();
    var endDate = '' == this.mOpts.endDate ? (new Date()) : this.str2date(this.mOpts.endDate);
    this.calendar_endDate = new Date(endDate.getFullYear(), endDate.getMonth() + 1, 0);
    for (var i = 0; i < this.mOpts.calendars; i++) {
        var table = this.fillDate(endDate.getFullYear(), endDate.getMonth(), i);
        if (0 == i) {
            $("#" + this.dateListId).append(table);
        } else {
            var firstTb = $("#" + this.dateListId).find('table').get(0);
            $(firstTb).before(table);
        }
        endDate.setMonth(endDate.getMonth() - 1, 1);
    }
    $('#' + this.preMonth).bind('click', function () {
        __method.calendar_endDate.setMonth(__method.calendar_endDate.getMonth() - 1, 1);
        __method.mOpts.endDate = __method.date2ymd(__method.calendar_endDate).join('-');
        __method.init(isCompare);
        if (1 == __method.mOpts.calendars) {
            if ('' == $('#' + __method.startDateId).val()) {
                __method.changeInput(__method.startDateId);
            } else {
                __method.changeInput(__method.endDateId);
            }
        }
        return false;
    });
    $('#' + this.nextMonth).bind('click', function () {
        __method.calendar_endDate.setMonth(__method.calendar_endDate.getMonth() + 1, 1);
        __method.mOpts.endDate = __method.date2ymd(__method.calendar_endDate).join('-');
        __method.init(isCompare);
        if (1 == __method.mOpts.calendars) {
            if ('' == $('#' + __method.startDateId).val()) {
                __method.changeInput(__method.startDateId);
            } else {
                __method.changeInput(__method.endDateId);
            }
        }
        return false;
    });
    this.calendar_startDate = new Date(endDate.getFullYear(), endDate.getMonth() + 1, 1);
    if (this.endDateId != this.dateInput && this.endCompareDateId != this.dateInput) {
        (isNeedCompare && typeof (isCompare) != 'undefined') ? this.addCSS(1) : this.addCSS(0);
    }
    __method.removeCSS();
    if (isNeedCompare && typeof (isCompare) != 'undefined') {
        __method.addCSS(1);
    } else {
        __method.addCSS(0);
    }
    $('#' + __method.compareInputDiv).css('display', isNeedCompare ? '' : 'none');
    for (var property in __method.periodObj) {
        if ($('#' + __method.mOpts[property])) {
            $('#' + __method.mOpts[property]).unbind('click');
            $('#' + __method.mOpts[property]).bind('click', function () {
                $(this).parent().parent().find('li').removeClass();
                $(this).parent().addClass('active');
                var timeObj = __method.getSpecialPeriod(__method.periodObj[$(this).attr('id')]);
                $('#' + __method.startDateId).val(__method.formatDate(timeObj.otherday));
                $('#' + __method.endDateId).val(__method.formatDate(timeObj.today));
                $('#' + __method.mOpts.startDateId).val($('#' + __method.startDateId).val());
                $('#' + __method.mOpts.endDateId).val($('#' + __method.endDateId).val());
                $('#' + __method.compareInputDiv).css('display', 'none');
                $('#' + __method.compareCheckboxId).attr('checked', false);
                $('#' + __method.mOpts.compareCheckboxId).val($('#' + __method.compareCheckboxId).attr('checked') ? 1 : 0);
                __method.close(__method.oprtDic.INIT);
                $('#' + __method.startCompareDateId).val('');
                $('#' + __method.endCompareDateId).val('');
                $('#' + __method.mOpts.startCompareDateId).val('');
                $('#' + __method.mOpts.endCompareDateId).val('');
                __method.sourceId = this.id;
                __method.mOpts.success(__method);
            });
        }
    }
};
pickerDateRange.prototype.ctrlDateRange = function (step) {
    var ctrlMap = [];
    var chkId = '';
    var firstId = this.rangeObj.cbRangeDay;
    if (this.isHourStats) {
        var hourId = this.rangeObj.cbRangeHour
        if (step == 0) {
            chkId = hourId;
            $('#' + hourId).attr('checked', true);
            $('#' + hourId).next('label').toggleClass('a', false);
            $('#' + hourId).next('label').removeClass('disabled');
        } else {
            $('#' + hourId).attr('checked', false);
            $('#' + hourId).attr('disabled', true);
            $('#' + hourId).next('label').addClass('disabled');
        }
    }
    ctrlMap[1] = this.rangeObj.cbRangeDay;
    ctrlMap[7] = this.rangeObj.cbRangeWeek;
    ctrlMap[30] = this.rangeObj.cbRangeMonth;
    step = Math.abs(step);
    $.each(ctrlMap, function (idx, id) {
        if (id) {
            if (step < idx) {
                $('#' + id).attr('disabled', true);
                $('#' + id).attr('checked', false);
                $('#' + id).next('label').removeClass('a');
                $('#' + id).next('label').addClass('disabled');
            } else {
                $('#' + id).attr('disabled', false);
                $('#' + id).next('label').removeClass('disabled');
            }
            if (!chkId && $('#' + id).attr('checked')) {
                chkId = id;
            }
        }
    });
    if (chkId) {
        $('#' + chkId).attr('disabled', false);
    } else {
        chkId = firstId;
        $('#' + firstId).attr('disabled', false);
        $('#' + firstId).attr('checked', true);
        $('#' + firstId).next('label').addClass('a');
        $('#' + firstId).next('label').removeClass('disabled');
    }
    $('#' + this.mOpts.rangeTableId).val($('#' + chkId).val());
}
pickerDateRange.prototype.getSpecialPeriod = function (period) {
    var __method = this;
    var date = new Date();
    (__method.mOpts.isTodayValid && ('' != __method.mOpts.isTodayValid) || 2 > period) ? '' : date.setTime(date.getTime() - (1 * 24 * 60 * 60 * 1000));
    var timeStamp = ((date.getTime() - (period * 24 * 60 * 60 * 1000)) < (this.mOpts.validStartTime * 1000)) ? (this.mOpts.validStartTime * 1000) : (date.getTime() - (period * 24 * 60 * 60 * 1000));
    var todayStr = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    date.setTime(timeStamp);
    var otherdayStr = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    if (period == __method.periodObj.aYesterday) {
        todayStr = otherdayStr;
    }
    return {
        today: todayStr,
        otherday: otherdayStr
    };
}
pickerDateRange.prototype.removeCSS = function (isCompare, specialClass) {
    if ('undefined' == typeof (specialClass)) {
        specialClass = this.mOpts.coincideCss;
    }
    if ('undefined' == typeof (isCompare)) {
        isCompare = 0;
    }
    var bDate = new Date(this.calendar_startDate.getFullYear(), this.calendar_startDate.getMonth(), this.calendar_startDate.getDate());
    var cla = '';
    for (var d = new Date(bDate); d.getTime() <= this.calendar_endDate.getTime(); d.setDate(d.getDate() + 1)) {
        cla = this.mOpts.selectCss;
        $('#' + this.date2ymd(d).join('-')).removeClass(this.mOpts.firstCss).removeClass(this.mOpts.lastCss).removeClass(this.mOpts.clickCss);
        $('#' + this.date2ymd(d).join('-')).removeClass(cla);
    }
};
pickerDateRange.prototype.addCSS = function (isCompare, specialClass) {
    if ('undefined' == typeof (specialClass)) {
        specialClass = this.mOpts.coincideCss;
    }
    if ('undefined' == typeof (isCompare)) {
        isCompare = 0;
    }
    var startDate = this.str2date($('#' + this.startDateId).val());
    var endDate = this.str2date($('#' + this.endDateId).val());
    var startCompareDate = this.str2date($('#' + this.startCompareDateId).val());
    var endCompareDate = this.str2date($('#' + this.endCompareDateId).val());
    var sDate = 0 == isCompare ? startDate : startCompareDate;
    var eDate = 0 == isCompare ? endDate : endCompareDate;
    var cla = '';
    for (var d = new Date(sDate); d.getTime() <= eDate.getTime(); d.setDate(d.getDate() + 1)) {
        if (0 == isCompare) {
            cla = this.mOpts.selectCss;
        } else {
            cla = this.mOpts.compareCss;
        }
        $('#' + this.date2ymd(d).join('-')).removeClass().addClass(cla);
    }
    $('#' + this.date2ymd(new Date(sDate)).join('-')).removeClass().addClass(this.mOpts.firstCss);
    $('#' + this.date2ymd(new Date(eDate)).join('-')).removeClass().addClass(this.mOpts.lastCss);
    sDate.getTime() == eDate.getTime() && $('#' + this.date2ymd(new Date(eDate)).join('-')).removeClass().addClass(this.mOpts.clickCss);
};
pickerDateRange.prototype.checkDateRange = function (startYmd, endYmd) {
    var sDate = this.str2date(startYmd);
    var eDate = this.str2date(endYmd);
    var sTime = sDate.getTime();
    var eTime = eDate.getTime();
    var minEDate, maxEDate;
    if (eTime >= sTime) {
        maxEDate = this.str2date(startYmd);
        maxEDate.setMonth(maxEDate.getMonth() + this.mOpts.monthRangeMax);
        maxEDate.setDate(maxEDate.getDate() + this.mOpts.dayRangeMax - 1);
        if (maxEDate.getTime() < eTime) {
            alert('结束日期不能大于：' + this.date2ymd(maxEDate).join('-'));
            return false;
        }
    } else {
        maxEDate = this.str2date(startYmd);
        maxEDate.setMonth(maxEDate.getMonth() - this.mOpts.monthRangeMax);
        maxEDate.setDate(maxEDate.getDate() - this.mOpts.dayRangeMax + 1);
        if (maxEDate.getTime() > eTime) {
            alert('开始日期不能小于：' + this.date2ymd(maxEDate).join('-'));
            return false;
        }
    }
    return true;
}
pickerDateRange.prototype.selectDate = function (ymd) {
    var ymdFormat = this.formatDate(ymd);
    if (true == this.mOpts.singleCompare || true == this.mOpts.isSingleDay) {
        if ((this.dateInput == this.startCompareDateId && '' != $('#' + this.startDateId).val() && ymdFormat == $('#' + this.startDateId).val() || this.dateInput == this.startDateId && '' != $('#' + this.startCompareDateId).val() && ymdFormat == $('#' + this.startCompareDateId).val()) && $('#' + this.compareCheckboxId).attr('checked')) {
            this.close(this.oprtDic.CLOSE);
            Ta.util.showMessage('对不起，实时数据不能用同一天进行对比！', '', '', 4, 3);
            return false;
        }
    }
    if (this.startDateId == this.dateInput) {
        this.removeCSS();
        $('#' + ymd).addClass(this.mOpts.clickCss);
        this.startDefDate = $('#' + this.dateInput).val();
        $('#' + this.dateInput).val(ymdFormat);
        if (true == this.mOpts.singleCompare || true == this.mOpts.isSingleDay) {
            this.dateInput = this.startDateId;
            $('#' + this.endDateId).val(ymdFormat);
        } else {
            this.dateInput = this.endDateId;
        }
    } else if (this.endDateId == this.dateInput) {
        if ('' == $('#' + this.startDateId).val()) {
            this.dateInput = this.startDateId;
            this.selectDate(ymd);
            return false;
        }
        if (false == this.checkDateRange($('#' + this.startDateId).val(), ymd)) {
            return false;
        }
        if (-1 == this.compareStrDate(ymd, $('#' + this.startDateId).val())) {
            $('#' + this.dateInput).val($('#' + this.startDateId).val());
            $('#' + this.startDateId).val(ymdFormat);
            ymdFormat = $('#' + this.dateInput).val();
        }
        $('#' + this.dateInput).val(ymdFormat);
        this.dateInput = this.startDateId;
        this.removeCSS(0);
        this.addCSS(0);
        this.startDefDate = '';
    } else if (this.startCompareDateId == this.dateInput) {
        this.removeCSS();
        $('#' + ymd).attr('class', this.mOpts.clickCss);
        this.startDefDate = $('#' + this.dateInput).val();
        $('#' + this.dateInput).val(ymdFormat);
        this.dateInput = this.endCompareDateId;
        if (true == this.mOpts.singleCompare) {
            this.dateInput = this.startCompareDateId;
            $('#' + this.endCompareDateId).val(ymdFormat);
        }
    } else if (this.endCompareDateId == this.dateInput) {
        if ('' == $('#' + this.startCompareDateId).val()) {
            this.dateInput = this.startCompareDateId;
            this.selectDate(ymd);
            return false;
        }
        if (false == this.checkDateRange($('#' + this.startCompareDateId).val(), ymd)) {
            return false;
        }
        if (-1 == this.compareStrDate(ymd, $('#' + this.startCompareDateId).val())) {
            $('#' + this.dateInput).val($('#' + this.startCompareDateId).val());
            $('#' + this.startCompareDateId).val(ymdFormat);
            ymdFormat = $('#' + this.dateInput).val();
        }
        $('#' + this.dateInput).val(ymdFormat);
        this.dateInput = this.startCompareDateId;
        this.removeCSS(1);
        this.addCSS(1);
        this.startDefDate = '';
    }
    this.changeInput(this.dateInput);
};
pickerDateRange.prototype.show = function (isCompare, __method) {
    isCompare ? function () {
        $('#' + __method.dateRangeDiv).css('display', 'none');
        $('#' + __method.dateRangeCompareDiv).css('display', 'block');
    }() : function () {
        $('#' + __method.dateRangeDiv).show();
        $('#' + __method.dateRangeCompareDiv).hide();
    }();
    var pos = isCompare ? $('#' + this.inputCompareId).offset() : $('#' + this.inputId).offset();
    var offsetHeight = isCompare ? $('#' + this.inputCompareId).attr('offsetHeight') : $('#' + this.inputId).attr('offsetHeight')
    var clientWidth = parseInt($(document.body).attr('clientWidth'));
    var left = pos.left;
    $("#" + this.calendarId).css('display', 'block');
    if (true == this.mOpts.singleCompare || true == this.mOpts.isSingleDay) {
        $('#' + this.endDateId).css('display', 'none');
        $('#' + this.endCompareDateId).css('display', 'none');
        $('.' + this.mOpts.joinLineId).css('display', 'none');
    }
    if (0 < clientWidth && $("#" + this.calendarId).attr('offsetWidth') + pos.left > clientWidth) {
        left = pos.left + $('#' + this.inputId).attr('offsetWidth') - $("#" + this.calendarId).attr('offsetWidth') + ((/msie/i.test(navigator.userAgent) && !(/opera/i.test(navigator.userAgent))) ? 5 : 0);
    }
    $("#" + this.calendarId).css('left', left + 'px');
    $("#" + this.calendarId).css('top', pos.top + (offsetHeight ? offsetHeight - 1 : 35) + 'px');
    isCompare ? this.changeInput(this.startCompareDateId) : this.changeInput(this.startDateId);
    return false;
};
pickerDateRange.prototype.close = function (status) {
    $("#" + this.calendarId).css('display', 'none');
    if (status == this.oprtDic.INIT || status == this.oprtDic.SUBMIT) {
        var nDateTime = ((this.mOpts.isTodayValid && '' != this.mOpts.isTodayValid)) ? new Date().getTime() : new Date().getTime() - (1 * 24 * 60 * 60 * 1000);
        var bDateTime = this.str2date($('#' + this.startDateId).val()).getTime();
        var eDateTime = this.str2date($('#' + this.endDateId).val()).getTime();
        if (eDateTime < bDateTime) {
            var tmp = $('#' + this.startDateId).val();
            $('#' + this.startDateId).val($('#' + this.endDateId).val());
            $('#' + this.endDateId).val(tmp);
        }
        var input = document.getElementById(this.inputId);
        if (input && input.tagName == 'INPUT') {
            $('#' + this.inputId).val($('#' + this.startDateId).val() + ($('#' + this.startDateId).val() == $('#' + this.endDateId).val() ? '' : this.mOpts.defaultText + $('#' + this.endDateId).val()));
        } else {
            $('#' + this.inputId).html($('#' + this.startDateId).val() + ($('#' + this.startDateId).val() == $('#' + this.endDateId).val() ? '' : this.mOpts.defaultText + $('#' + this.endDateId).val()));
        }
        if ('' != $('#' + this.startCompareDateId).val() && '' != $('#' + this.endCompareDateId).val()) {
            var bcDateTime = this.str2date($('#' + this.startCompareDateId).val()).getTime();
            var ecDateTime = this.str2date($('#' + this.endCompareDateId).val()).getTime();
            var _ecDateTime = bcDateTime + eDateTime - bDateTime;
            if (_ecDateTime > nDateTime) {
                _ecDateTime = nDateTime;
                $('#' + this.startCompareDateId).val(this.formatDate(this.date2ymd(new Date(_ecDateTime + bDateTime - eDateTime)).join('-')));
            }
            $('#' + this.endCompareDateId).val(this.formatDate(this.date2ymd(new Date(_ecDateTime)).join('-')));
            var bcDateTime = this.str2date($('#' + this.startCompareDateId).val()).getTime();
            var ecDateTime = this.str2date($('#' + this.endCompareDateId).val()).getTime();
            if (ecDateTime < bcDateTime) {
                var tmp = $('#' + this.startCompareDateId).val();
                $('#' + this.startCompareDateId).val($('#' + this.endCompareDateId).val());
                $('#' + this.endCompareDateId).val(tmp);
            }
        }
        $('#' + this.inputCompareId).html($('#' + this.startCompareDateId).val() + ($('#' + this.startCompareDateId).val() == $('#' + this.endCompareDateId).val() ? '' : this.mOpts.defaultText + $('#' + this.endCompareDateId).val()));
        var step = (bDateTime - eDateTime) / 86400000;
        this.ctrlDateRange(step);
        $('#' + this.mOpts.startDateId).val($('#' + this.startDateId).val());
        $('#' + this.mOpts.endDateId).val($('#' + this.endDateId).val());
        $('#' + this.mOpts.startCompareDateId).val($('#' + this.startCompareDateId).val());
        $('#' + this.mOpts.endCompareDateId).val($('#' + this.endCompareDateId).val());
        if (status == this.oprtDic.SUBMIT) {
            for (var property in this.periodObj) {
                var dateRange = this.getSpecialPeriod(this.periodObj[property]);
                if (bDateTime == this.str2date(dateRange.otherday).getTime() && eDateTime == this.str2date(dateRange.today).getTime()) {
                    $('#' + this.mOpts[property]).parent().addClass('active');
                } else {
                    $('#' + this.mOpts[property]).parent().removeClass('active');
                }
            }
        }
    }
    return false;
};
pickerDateRange.prototype.fillDate = function (year, month, index) {
    var __method = this;
    var firstDayOfMonth = new Date(year, month, 1);
    var dateBegin = new Date(year, month, 1);
    var w = dateBegin.getDay();
    dateBegin.setDate(1 - w);
    var lastDayOfMonth = new Date(year, month + 1, 0);
    var dateEnd = new Date(year, month + 1, 0);
    w = dateEnd.getDay();
    dateEnd.setDate(dateEnd.getDate() + 6 - w);
    var today = new Date();
    var dToday = today.getDate();
    var mToday = today.getMonth();
    var yToday = today.getFullYear();
    var table = document.createElement('table');
    table.className = this.mOpts.dateTable;
    cap = document.createElement('caption');
    $(cap).append(year + '年' + (month + 1) + '月');
    $(table).append(cap);
    thead = document.createElement('thead');
    tr = document.createElement('tr');
    var days = ['日', '一', '二', '三', '四', '五', '六'];
    for (var i = 0; i < 7; i++) {
        th = document.createElement('th');
        $(th).append(days[i]);
        $(tr).append(th);
    }
    $(thead).append(tr);
    $(table).append(thead);
    tr = document.createElement('tr');
    td = document.createElement('td');
    if (0 == index) {
        $(td).append('<a href="javascript:void(0);" id="' + this.nextMonth + '"><i class="i_next"></i></a>');
    }
    if (index + 1 == this.mOpts.calendars) {
        $(td).append('<a href="javascript:void(0);" id="' + this.preMonth + '"><i class="i_pre"></i></a>');
    }
    $(td).attr('colSpan', 7);
    $(td).css('text-align', 'center');
    $(tr).append(td);
    $(table).append(tr);
    var tdClass = '',
        deviation = 0,
        ymd = '';
    for (var d = dateBegin; d.getTime() <= dateEnd.getTime(); d.setDate(d.getDate() + 1)) {
        if (d.getTime() < firstDayOfMonth.getTime()) {
            tdClass = this.mOpts.disableGray;
            deviation = '-1';
        } else if (d.getTime() > lastDayOfMonth.getTime()) {
            tdClass = this.mOpts.disableGray;
            deviation = '1';
        } else if ((this.mOpts.stopToday == true && d.getTime() > today.getTime()) || d.getTime() < this.mOpts.validStartTime * 1000) {
            tdClass = this.mOpts.disableGray;
            deviation = '2';
        } else {
            deviation = '0';
            if (d.getDate() == dToday && d.getMonth() == mToday && d.getFullYear() == yToday) {
                if (this.mOpts.isTodayValid) {
                    tdClass = this.mOpts.isToday;
                } else {
                    tdClass = this.mOpts.disableGray;
                    deviation = '2';
                }
            } else {
                tdClass = '';
            }
        }
        if (0 == d.getDay()) {
            tr = document.createElement('tr');
        }
        td = document.createElement('td');
        td.innerHTML = d.getDate();
        if ('' != tdClass) {
            $(td).attr('class', tdClass);
        }
        if (0 == deviation) {
            ymd = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
            $(td).attr('id', ymd);
            $(td).css('cursor', 'pointer');
            (function (ymd) {
                $(td).bind("click", ymd, function () {
                    __method.selectDate(ymd);
                    return false;
                });
            })(ymd);
        }
        $(tr).append(td);
        if (6 == d.getDay()) {
            $(table).append(tr);
        }
    }
    return table;
};
pickerDateRange.prototype.str2date = function (str) {
    var ar = str.split('-');
    return new Date(ar[0], ar[1] - 1, ar[2]);
};
pickerDateRange.prototype.compareStrDate = function (b, e) {
    var bDate = this.str2date(b);
    var eDate = this.str2date(e);
    if (bDate.getTime() > eDate.getTime()) {
        return 1;
    } else if (bDate.getTime() == eDate.getTime()) {
        return 0;
    } else {
        return -1;
    }
};
pickerDateRange.prototype.date2ymd = function (d) {
    return [d.getFullYear(), (d.getMonth() + 1), d.getDate()];
};
pickerDateRange.prototype.changeInput = function (ipt) {
    if (true == this.mOpts.isSingleDay) {
        ipt = this.startDateId;
    }
    var allInputs = [this.startDateId, this.startCompareDateId, this.endDateId, this.endCompareDateId];
    var cla = '';
    cla = this.mOpts.compareCss;
    if (ipt == this.endDateId && this.mOpts.singleCompare) {
        cla = this.mOpts.clickCss;
    }
    for (var i in allInputs) {
        $('#' + allInputs[i]).removeClass(this.mOpts.selectCss);
        $('#' + allInputs[i]).removeClass(this.mOpts.compareCss);
    }
    $('#' + ipt).addClass(cla);
    $('#' + ipt).css('background-repeat', 'repeat');
    this.dateInput = ipt;
};
pickerDateRange.prototype.formatDate = function (ymd) {
    return ymd.replace(/(\d{4})\-(\d{1,2})\-(\d{1,2})/g, function (ymdFormatDate, y, m, d) {
        if (m < 10) {
            m = '0' + m;
        }
        if (d < 10) {
            d = '0' + d;
        }
        return y + '-' + m + '-' + d;
    });
}
pickerDateRange.prototype.changeExportClass = function (small) {
    if (small) {
        $('#' + this.mOpts.exportFileId).removeClass('export');
        $('#' + this.mOpts.exportFileId).addClass('export_small');
    } else {
        $('#' + this.mOpts.exportFileId).removeClass('export_small');
        $('#' + this.mOpts.exportFileId).addClass('export');
    }
} /*  |xGv00|c6fff5bb57d7481a49a7cc5c54422f86 */