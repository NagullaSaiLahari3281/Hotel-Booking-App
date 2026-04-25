let selectedRoom = null;

function selectRoom(element, name, price) {
  document.querySelectorAll(".room").forEach(r => {
    r.classList.remove("selected");
  });

  element.classList.add("selected");

  selectedRoom = { name, price };
}

function submitBooking(e) {
  e.preventDefault();

  let name = document.getElementById("name").value.trim();
  let email = document.getElementById("email").value.trim();
  let phone = document.getElementById("phone").value.trim();
  let checkin = document.getElementById("checkin").value;
  let checkout = document.getElementById("checkout").value;

  if (!name || !email || !phone || !checkin || !checkout) {
    showPopup("❌ Booking Failed! Please fill all fields.", "error");
    return;
  }

  if (!selectedRoom) {
    showPopup("❌ Please select a room.", "error");
    return;
  }

  if (!/^[0-9]{10}$/.test(phone)) {
    showPopup("❌ Invalid phone number.", "error");
    return;
  }

  if (!email.includes("@") || !email.includes(".")) {
    showPopup("❌ Invalid email.", "error");
    return;
  }

  if (checkout <= checkin) {
    showPopup("❌ Check-out must be after check-in.", "error");
    return;
  }

  let formattedName = name.charAt(0).toUpperCase() + name.slice(1);

  showPopup(
    `✅ Booking Successful 🎉
${formattedName}, your stay is confirmed!

Room: ${selectedRoom.name}
Price: ₹${selectedRoom.price}`,
    "success"
  );
}

function showPopup(message, type) {
  const popup = document.getElementById("popup");

  popup.className = "popup";
  popup.classList.add(type);

  document.getElementById("popupMsg").innerText = message;
  popup.style.display = "block";
}

function closePopup() {
  document.getElementById("popup").style.display = "none";
}