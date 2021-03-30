$(function () {
    $("#tableRowCount").on("keypress keyup change", function (event) {
        if (event.type === "keypress" && event.key === "Enter")
            event.preventDefault();
        const numGroup = parseInt($(this).val());
        const c1 = chroma('cyan');
        const c2 = chroma('lime');
        const c3 = chroma('yellow');
        const c4 = chroma('red');
        const $tbody = $("#colorGradientTable tbody");

        // clear the table
        $tbody.find("tr").remove();

        // loop for iterating over range to create gradients
        for (let i = 0; i < numGroup; i++) {
            const $curRow = $tbody.append(
                `<tr>
                    <td class="border border-dark"></td>
                    <td class="border border-dark"></td>
                    <td></td>
                </tr>`)
                .find('tr:last');
            const $indexCell = $curRow.find('td:eq(0)');
            const $valCell = $curRow.find('td:eq(1)');
            const $colorCell = $curRow.find('td:eq(2)');
            const factor = (i + 1) / numGroup;

            // let chroma do the magic...
            const rgbString = chroma.scale([c1, c2, c3, c4])(factor).rgb().toString();
            $indexCell.html(i + 1);
            $valCell.html(rgbString);
            $colorCell.css("background-color", `rgb(${rgbString})`);
        }
    });
});