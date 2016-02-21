var regex = new Array(),
    it;

function clean_it(it) {
    regex[0] = /\./ig;
    regex[1] = /\,/ig;
    it = it.replace(regex[0], "");
    it = it.replace(regex[1], "");
    return it;
}
var num, LNum, x, fnum, snums, snumx, snumsr, snumr;
//Fungsi convert dari clean to number format
function rubah(num) {
    num = String(num);
    LNum = num.length;
    if (LNum > 3) {
        fnum = parseInt(LNum / 3, 10);
        if ((LNum % 3) === 0) {
            fnum--;
        }
        regex[2] = /(.+)(\d{3}$)/ig;
        for (x = 1; x <= fnum; x++) {
            if (x == 1) {
                snums = num.replace(regex[2], "$2");
                snumx = num.replace(regex[2], "$1");
                snumsr = "." + snums;
            } else {
                snums = snumx.replace(regex[2], "$2");
                snumx = snumx.replace(regex[2], "$1");
                snumsr = "." + snums + snumsr;
            }
        }
        snumr = snumx + snumsr;
    } else {
        snumr = num;
    }
    return snumr;
}
var b, toformat;
//Fungsi clean and format number
function formated(b) {
    toformat = document.form1.elements[b].value;
    toformat = clean_it(toformat);
    toformat = parseInt(toformat, 10);
    toformat = rubah(toformat);
    document.form1.elements[b].value = toformat;
}

// Fungsi untuk nisab penghasilan
function hitung_nisab() {
    var gaji_perbulan = $('.gaji_perbulan').val();
    var penghasilan_lain = $('.penghasilan_lain').val();
    var hutang = $('.hutang').val();

    pendapatan = parseInt(gaji_perbulan) + parseInt(penghasilan_lain) - parseInt(hutang);
    besar_nishab = parseInt(522 * 6500);

    if (pendapatan > besar_nishab) {
        $('.hasil_nisab').text('WAJIB');
        jumlah_wajib_zakat = parseInt(0.025 * pendapatan);
    } else {
        $('.hasil_nisab').text('TIDAK');
        jumlah_wajib_zakat = parseInt(0);
    }

    $('.result_nisab').text(jumlah_wajib_zakat);
    $('.input_result').val(jumlah_wajib_zakat);
}

$('.gaji_perbulan, .penghasilan_lain, .hutang').keyup(function () {
    hitung_nisab();
});

//Jquery kalkulator
//Fungsi untuk membersihkan (.)

//Jquery for kalkulator
$('.gaji_saya, .penghasilan_lain, .hutang, .harga_beras, .sum_maal, .hutang, .hutang_tempo, .harga_emas,.res_zakat,.nominal_infak,.nominal_wakaf,.nominal_kemanusiaan').keyup(function () {

    //Perhitungan Zakat penghasilan
    gaji_saya = $('.gaji_saya').val();
    penghasilan_lain = $('.penghasilan_lain').val();
    hutang = $('.hutang').val();

    c_gaji_saya = clean_it(gaji_saya);
    c_penghasilan_lain = clean_it(penghasilan_lain);
    c_hutang = clean_it(hutang);

    total1 = parseInt(c_gaji_saya) + parseInt(c_penghasilan_lain) - parseInt(c_hutang);
    total2 = rubah(total1);
    $('.penghasilan_per_bulan').val(total2);

    //Perhitungan nisab zakat penghasilan
    harga_beras = $('.harga_beras').val();
    c_gaji_saya = clean_it(harga_beras);
    besar_nishab = parseInt(522 * c_gaji_saya);
    c_besar_nishab = rubah(besar_nishab);
    $('.besar_nishab').val(c_besar_nishab);

    if (besar_nishab < total1) {
        $('.wajib_zakat').val('YA');
        jumlah_wajib_zakat = parseInt(0.025 * total1);
        c_jumlah_wajib_zakat = rubah(jumlah_wajib_zakat);
    } else {
        $('.wajib_zakat').val('TIDAK');
        jumlah_wajib_zakat = parseInt(0);
        c_jumlah_wajib_zakat = jumlah_wajib_zakat;
    }
    $('.jumlah_wajib_zakat').val(c_jumlah_wajib_zakat);
    $('.zakat_perbulan').val(c_jumlah_wajib_zakat);

    //Perhitungan Zakat Maal
    var total = 0;
    $(".sum_maal").each(function () {
        total += parseInt(clean_it($(this).val()));
    });
    c_total = rubah(total);
    $('.jumlah_harta').val(c_total);

    hutang_tempo = $('.hutang_tempo').val();
    c_hutang_tempo = clean_it(hutang_tempo);
    jumlah_zakat_harta = total - c_hutang_tempo;
    c_jumlah_zakat_harta = rubah(jumlah_zakat_harta);
    $('.jumlah_zakat_harta').val(c_jumlah_zakat_harta);
    //End Perhitungan Zakat Maal

    //Perhitungan bayar Zakat Maal
    //----------------------------
    harga_emas = $('.harga_emas').val();
    c_harga_emas = clean_it(harga_emas);
    nisab_maal_pertahun = parseInt(85 * c_harga_emas);
    c_nisab_maal_pertahun = rubah(nisab_maal_pertahun);
    $('.nisab_maal_pertahun').val(c_nisab_maal_pertahun);

    if (nisab_maal_pertahun < jumlah_zakat_harta) {
        wajib_bayar_maal = 'YA';
        var wajib_bayar_maal_pertahun = parseInt(0.025 * total);
        var wajib_bayar_maal_perbulan = parseInt(wajib_bayar_maal_pertahun / 12);
    } else {
        wajib_bayar_maal = 'TIDAK';
        wajib_bayar_maal_pertahun = parseInt('0');
        wajib_bayar_maal_perbulan = parseInt('0');
    }
    $('.wajib_bayar_maal').val(wajib_bayar_maal);
    $('.wajib_bayar_maal_pertahun').val(rubah(wajib_bayar_maal_pertahun));
    $('.wajib_bayar_maal_perbulan').val(rubah(wajib_bayar_maal_perbulan));
    $('.zakat_maal_perbulan').val(rubah(wajib_bayar_maal_perbulan));

    //RESUME
    total_zakat_perbulan = jumlah_wajib_zakat + wajib_bayar_maal_perbulan;
    c_total_zakat_perbulan = rubah(total_zakat_perbulan);
    $('.total_zakat_perbulan').val(c_total_zakat_perbulan);
    $('.total_zakat_perbulan_ipaymu').val(clean_it(c_total_zakat_perbulan));
    $('.res_zakat').val(c_total_zakat_perbulan);

    //Perhitungan Zakat Maal
    var total_resume = 0;
    $(".sum_resume").each(function () {
        total_resume += parseInt(clean_it($(this).val()));
    });
    c_total_resume = rubah(total_resume);
    $('.total_ipaymu').val(c_total_resume);
    $('.total_ipaymu2').val(total_resume);
    $("[name='price']").val(total_resume);

});
//End jquery kalkulator