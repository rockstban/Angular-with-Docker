'use strict'

const emailTemplate = (nombre, codigoReserva) => {
    let emailTemplate = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html dir="ltr" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="es">
     <head>
      <meta charset="UTF-8">
      <meta content="width=device-width, initial-scale=1" name="viewport">
      <meta name="x-apple-disable-message-reformatting">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta content="telephone=no" name="format-detection">
      <title>Nueva plantilla</title><!--[if (mso 16)]>
        <style type="text/css">
        a {text-decoration: none;}
        </style>
        <![endif]--><!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]--><!--[if gte mso 9]>
    <xml>
        <o:OfficeDocumentSettings>
        <o:AllowPNG></o:AllowPNG>
        <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
    </xml>
    <![endif]--><!--[if !mso]><!-- -->
      <link href="https://fonts.googleapis.com/css2?family=Exo+2:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet"><!--<![endif]-->
      <style type="text/css">
    .rollover:hover .rollover-first {
      max-height:0px!important;
      display:none!important;
      }
      .rollover:hover .rollover-second {
      max-height:none!important;
      display:block!important;
      }
      .rollover span {
      font-size:0;
      }
      u + .body img ~ div div {
      display:none;
      }
      #outlook a {
      padding:0;
      }
      span.MsoHyperlink,
    span.MsoHyperlinkFollowed {
      color:inherit;
      mso-style-priority:99;
      }
      a.es-button {
      mso-style-priority:100!important;
      text-decoration:none!important;
      }
      a[x-apple-data-detectors] {
      color:inherit!important;
      text-decoration:none!important;
      font-size:inherit!important;
      font-family:inherit!important;
      font-weight:inherit!important;
      line-height:inherit!important;
      }
      .es-desk-hidden {
      display:none;
      float:left;
      overflow:hidden;
      width:0;
      max-height:0;
      line-height:0;
      mso-hide:all;
      }
      .es-button-border:hover > a.es-button {
      color:#000000!important;
      }
      .container-hover:hover>table {
      background:linear-gradient(153.06deg, #7EE8FA -0.31%, #EEC0C6 99.69%)!important;
      transition:0.3s all!important;
      }
      .es-menu.es-table-not-adapt td a:hover,
    a.es-button:hover {
      text-decoration:underline!important;
      }
      td .es-button-border:hover a.es-button-3719 {
      color:#ffffff!important;
      }
    @media only screen and (max-width:600px) {.es-m-p15r { padding-right:15px!important } .es-m-p15l { padding-left:15px!important } .es-m-p20 { padding:20px!important } *[class="gmail-fix"] { display:none!important } p, a { line-height:150%!important } h1, h1 a { line-height:120%!important } h2, h2 a { line-height:120%!important } h3, h3 a { line-height:120%!important } h4, h4 a { line-height:120%!important } h5, h5 a { line-height:120%!important } h6, h6 a { line-height:120%!important } h1 { font-size:28px!important; text-align:left } h2 { font-size:24px!important; text-align:left } h3 { font-size:20px!important; text-align:left } h4 { font-size:24px!important; text-align:left } h5 { font-size:20px!important; text-align:left } h6 { font-size:16px!important; text-align:left } .es-header-body h1 a, .es-content-body h1 a, .es-footer-body h1 a { font-size:28px!important } .es-header-body h2 a, .es-content-body h2 a, .es-footer-body h2 a { font-size:24px!important } .es-header-body h3 a, .es-content-body h3 a, .es-footer-body h3 a { font-size:20px!important } .es-header-body h4 a, .es-content-body h4 a, .es-footer-body h4 a { font-size:24px!important } .es-header-body h5 a, .es-content-body h5 a, .es-footer-body h5 a { font-size:20px!important } .es-header-body h6 a, .es-content-body h6 a, .es-footer-body h6 a { font-size:16px!important } .es-menu td a { font-size:16px!important } .es-header-body p, .es-header-body a { font-size:16px!important } .es-content-body p, .es-content-body a { font-size:16px!important } .es-footer-body p, .es-footer-body a { font-size:16px!important } .es-infoblock p, .es-infoblock a { font-size:12px!important } .es-m-txt-c, .es-m-txt-c h1, .es-m-txt-c h2, .es-m-txt-c h3, .es-m-txt-c h4, .es-m-txt-c h5, .es-m-txt-c h6 { text-align:center!important } .es-m-txt-r, .es-m-txt-r h1, .es-m-txt-r h2, .es-m-txt-r h3, .es-m-txt-r h4, .es-m-txt-r h5, .es-m-txt-r h6 { text-align:right!important } .es-m-txt-j, .es-m-txt-j h1, .es-m-txt-j h2, .es-m-txt-j h3, .es-m-txt-j h4, .es-m-txt-j h5, .es-m-txt-j h6 { text-align:justify!important } .es-m-txt-l, .es-m-txt-l h1, .es-m-txt-l h2, .es-m-txt-l h3, .es-m-txt-l h4, .es-m-txt-l h5, .es-m-txt-l h6 { text-align:left!important } .es-m-txt-r img, .es-m-txt-c img, .es-m-txt-l img { display:inline!important } .es-m-txt-r .rollover:hover .rollover-second, .es-m-txt-c .rollover:hover .rollover-second, .es-m-txt-l .rollover:hover .rollover-second { display:inline!important } .es-m-txt-r .rollover span, .es-m-txt-c .rollover span, .es-m-txt-l .rollover span { line-height:0!important; font-size:0!important } .es-spacer { display:inline-table } a.es-button, button.es-button { font-size:20px!important; line-height:120%!important } a.es-button, button.es-button, .es-button-border { display:inline-block!important } .es-m-fw, .es-m-fw.es-fw, .es-m-fw .es-button { display:block!important } .es-m-il, .es-m-il .es-button, .es-social, .es-social td, .es-menu { display:inline-block!important } .es-adaptive table, .es-left, .es-right { width:100%!important } .es-content table, .es-header table, .es-footer table, .es-content, .es-footer, .es-header { width:100%!important; max-width:600px!important } .adapt-img { width:100%!important; height:auto!important } .es-mobile-hidden, .es-hidden { display:none!important } .es-desk-hidden { width:auto!important; overflow:visible!important; float:none!important; max-height:inherit!important; line-height:inherit!important } tr.es-desk-hidden { display:table-row!important } table.es-desk-hidden { display:table!important } td.es-desk-menu-hidden { display:table-cell!important } .es-menu td { width:1%!important } table.es-table-not-adapt, .esd-block-html table { width:auto!important } .es-social td { padding-bottom:10px } .h-auto { height:auto!important } .m-c-p16r { padding-right:8vw } }
    @media screen and (max-width:384px) {.mail-message-content { width:414px!important } }
    </style>
     </head>
     <body class="body" style="width:100%;height:100%;padding:0;Margin:0">
      <div dir="ltr" class="es-wrapper-color" lang="es" style="background-color:#12022F"><!--[if gte mso 9]>
                <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
                    <v:fill type="tile" src="https://tlr.stripocdn.email/content/guids/CABINET_bf3f28777a864b4fca3f15706a2554aa/images/group_10.png" color="#12022f" origin="0.5, 0" position="0.5, 0"></v:fill>
                </v:background>
            <![endif]-->
       <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0" background="https://felrhsp.stripocdn.email/content/guids/CABINET_bf3f28777a864b4fca3f15706a2554aa/images/group_10.png" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-image:url(https://felrhsp.stripocdn.email/content/guids/CABINET_bf3f28777a864b4fca3f15706a2554aa/images/group_10.png);background-repeat:no-repeat;background-position:center top;background-color:#12022F" role="none">
         <tr>
          <td valign="top" style="padding:0;Margin:0">
           <table cellpadding="0" cellspacing="0" class="es-content" align="center" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:100%;table-layout:fixed !important">
             <tr>
              <td class="es-m-p15r es-m-p15l" align="center" style="padding:0;Margin:0">
               <table class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:640px" role="none">
                 <tr>
                  <td align="left" style="padding:0;Margin:0;padding-top:30px;padding-right:40px;padding-left:40px">
                   <table cellpadding="0" cellspacing="0" width="100%" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                     <tr>
                      <td align="center" valign="top" style="padding:0;Margin:0;width:560px">
                       <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                         <tr class="es-mobile-hidden">
                          <td align="center" height="15" style="padding:0;Margin:0"></td>
                         </tr>
                       </table></td>
                     </tr>
                   </table></td>
                 </tr>
                 <tr>
                  <td class="es-m-p20" align="left" bgcolor="#ffffff" style="Margin:0;padding-top:30px;padding-right:40px;padding-left:40px;padding-bottom:40px;background-color:#ffffff;border-radius:20px 20px 0px 0px">
                   <table cellpadding="0" cellspacing="0" width="100%" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                     <tr>
                      <td align="left" style="padding:0;Margin:0;width:560px">
                       <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                         <tr>
                          <td align="center" style="padding:0;Margin:0;font-size:0px" height="32"><a target="_blank" href="https://gurpo4hotelepn.azurewebsites.net/" style="mso-line-height-rule:exactly;text-decoration:underline;color:#391484;font-size:18px"><img class="adapt-img" src="https://felrhsp.stripocdn.email/content/guids/CABINET_2853a51412fcc015e5cf200e9ef201619bf0bce87f1a8b5cd272260aebb644ae/images/logo.png" alt="" style="display:block;font-size:18px;border:0;outline:none;text-decoration:none" width="195"></a></td>
                         </tr>
                         <tr>
                          <td align="left" style="padding:0;Margin:0;padding-top:30px"><p align="left" style="Margin:0;mso-line-height-rule:exactly;font-family:'Exo 2', sans-serif;line-height:27px;letter-spacing:0;color:#666666;font-size:18px"><strong>Estimado/a ${nombre}!</strong><br><br>¡Gracias por elegir el hotel <em>"Copo de Nieve"</em> para tu estadía! Estamos emocionados de recibirte y asegurarnos de que tengas una experiencia inolvidable.<br><br>Este es el código de tu reserva:<br></p></td>
                         </tr>
                         <tr>
                          <td align="left" style="padding:0;Margin:0;padding-top:30px"><p align="center" style="Margin:0;mso-line-height-rule:exactly;font-family:'Exo 2', sans-serif;line-height:27px;letter-spacing:0;color:#666666;font-size:18px"><strong>${codigoReserva}&nbsp;</strong></p><p style="Margin:0;mso-line-height-rule:exactly;font-family:'Exo 2', sans-serif;line-height:27px;letter-spacing:0;color:#666666;font-size:18px"><strong>​</strong></p></td>
                         </tr>
                         <tr>
                          <td align="left" style="padding:0;Margin:0;padding-top:25px"><!--[if mso]><a href="https://gurpo4hotelepn.azurewebsites.net/detalles-reserva/${codigoReserva}" target="_blank" hidden>
        <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" esdevVmlButton href="https://viewstripo.email/" 
                    style="height:52px; v-text-anchor:middle; width:172px" arcsize="50%" strokecolor="#ffdda9" strokeweight="2px" fillcolor="#011f3b">
            <w:anchorlock></w:anchorlock>
            <center style='color:#ffffff; font-family:"Exo 2", sans-serif; font-size:20px; font-weight:400; line-height:20px;  mso-text-raise:1px'>Ver detalles</center>
        </v:roundrect></a>
    <![endif]--><!--[if !mso]><!-- --><span class="es-button-border msohide" style="border-style:solid;border-color:#FFDDA9;background:#011f3b;border-width:0px 0px 2px 0px;display:inline-block;border-radius:30px;width:auto;mso-hide:all"><a href="https://gurpo4hotelepn.azurewebsites.net/detalles-reserva/${codigoReserva}" class="es-button es-button-3719" target="_blank" style="mso-style-priority:100 !important;text-decoration:none !important;mso-line-height-rule:exactly;color:#ffffff;font-size:20px;padding:15px 30px 15px 30px;display:inline-block;background:#011f3b;border-radius:30px;font-family:'Exo 2', sans-serif;font-weight:normal;font-style:normal;line-height:24px;width:auto;text-align:center;letter-spacing:0;mso-padding-alt:0;mso-border-alt:10px solid #011f3b">Ver detalles</a></span><!--<![endif]--></td>
                         </tr>
                       </table></td>
                     </tr>
                   </table></td>
                 </tr>
               </table></td>
             </tr>
           </table></td>
         </tr>
       </table>
      </div>
     </body>
    </html>`;

    return emailTemplate;
}

//Exportar la funcion para poder utilizarla en otros archivos
exports.template = (nombre, codigoReserva) => emailTemplate(nombre, codigoReserva);
