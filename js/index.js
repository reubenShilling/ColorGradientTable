$(function () {
    // ********************************************************************************************************************************* //
    // This entire algorithm should be reworked to only divide by a number that does not produce a remainder.
    // It "works" as is but values are not what they should be when number of divisions (in this case "rows") is not a factor of 3.
    // ********************************************************************************************************************************* //

    // event listener to increment colors on input change
    $("#tableRowCount").on("keypress keyup change", function (event) {
        if (event.type === "keypress" && event.key === "Enter")
            event.preventDefault();
        const numGroup = parseInt($(this).val());
        const minInput = parseInt($(this).attr("min"));
        const maxInput = parseInt($(this).attr("max"));
        if (numGroup >= minInput && numGroup <= maxInput) {
            const colorGroup = Math.round(numGroup / 3);
            const interval = Math.round(255 / colorGroup);
            const $tbody = $("#colorGradientTable tbody");
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
                let rgbString = '';
                switch (true) {
                    case (i < colorGroup):
                        rgbString = `0, 255, ${Math.max((255 - interval) - (i * interval), 0)}`;
                        break;
                    case (i < colorGroup * 2):
                        rgbString = `${Math.max(((i - colorGroup) * interval) + interval, 0)}, 255, 0`;
                        break;
                    default:
                        rgbString = `255, ${Math.max((255 - interval) - ((i - (colorGroup * 2)) * interval), 0)}, 0`;
                        break;
                }
                $indexCell.html(i + 1);
                $valCell.html(rgbString);
                $colorCell.css("background-color", `rgb(${rgbString})`);
            }
        }
    });
});