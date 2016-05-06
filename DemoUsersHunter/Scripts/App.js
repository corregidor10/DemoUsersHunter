'use strict';

var context = SP.ClientContext.get_current();

function buscarUsuario() {

    var txt = $("#txtNombre").val();

    var criterio = "AccountName:" + txt;

    var query = new Microsoft.SharePoint.Client.Search.Query.KeywordQuery(context);

    query.set_queryText(criterio);

    query.set_sourceId("B09A7990-05EA-4AF9-81EF-EDFAB16C4E31");


    var searchExecutor = new Microsoft.SharePoint.Client.Search.Query.SearchExecutor(context);

    var res = searchExecutor.executeQuery(query);

    context.executeQueryAsync(function () {

        if (res.m_value.ResultTables[0].ResultRows.length < 1) {
            $("#res").html("NO HAY DATOS, ARTISTA");

        }
        else {
            var html = "<ul>";

            $.each(res.m_value.ResultTables[0].ResultRows,
                function (i, data) {
                    html += "<li>" +
                        data.AccountName +
                        //"" + data.apodo
                        "</li>";

                });


            html += "</ul>";

            $("#res").html(html);

        }



    },
        function () {
            alert("KO");
        });


}

$(document).ready(function () {
    $("#btnBucar").click(buscarUsuario);
})