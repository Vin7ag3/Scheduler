$(document).ready(function () {
    function displayCurrentDate() {
        $("#currentDay").text(dayjs().format('dddd, MMMM D'));
}

// update time-block class
    function updateTimeBlocks() {
        var currentHour = dayjs().hour();

        $(".time-block").each(function () {
            var blockHour = parseInt(this.id.split("-")[1]);
            var textarea = $(this).find("textarea").removeClass("past present future");

            // add the appropriate class
            if (blockHour < currentHour) {
                textarea.addClass("past");
            } else if (blockHour === currentHour) {
                textarea.addClass("present");
            } else if (blockHour >= 13 && blockHour <= 17) {
                textarea.addClass("future");
            } else {
                textarea.addClass("past");
            }
        });
}

// load from local.storage
    function loadStorageData() {
        for (var i = 9; i <= 17; i++) {
            $("#hour-" + i + " textarea").val(localStorage.getItem("hour-" + i));
        }
}

// generate time blocks 9-5
    function generateTimeBlocks() {
        for (var i = 9; i <= 17; i++) {
            $('#hour-' + i + ' .hour').text(dayjs().startOf("day").add(i, "hours").format('hh:mm A'));
        }
}

// eventlistener save to local.storage
    $(".saveBtn").click(function (event) {
        event.preventDefault();
        var formValue = $(this).siblings("textarea").val();
        var listItem = $(this).parent().attr("id");

        try {
            localStorage.setItem(listItem, formValue);
            console.log("saved", listItem, formValue);
        } catch (error) {
            console.error("Error saving", error);
        }
    });

    displayCurrentDate();
    updateTimeBlocks();
    loadStorageData();
    generateTimeBlocks();
});