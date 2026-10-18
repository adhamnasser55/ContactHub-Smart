var contactModal = document.getElementById("contactModal");
var totalContacts = document.getElementById("totalContacts");
var totalFavContacts = document.getElementById("totalFavContacts");
var totalEmergencyContacts = document.getElementById("totalEmergencyContacts");
var totalContactsSpan = document.getElementById("totalContactsSpan");
var addContactBtn = document.getElementById("addContactBtn");
var searchInput = document.getElementById("searchInput");
var callBtn = document.getElementById("callBtn");
var emailBtn = document.getElementById("emailBtn");
var favBtn = document.getElementById("favBtn");
var emergencyBtn = document.getElementById("emergencyBtn");
var editBtn = document.getElementById("editBtn");
var deleteBtn = document.getElementById("deleteBtn");
var emptyStateFav = document.getElementById("emptyStateFav");
var emptyStateEmergency = document.getElementById("emptyStateEmergency");
var smallEmergncyItem = document.getElementById("smallEmergncyItem");
var bigEmergencyItem = document.getElementById("bigEmergencyItem");
var smallFavItem = document.getElementById("smallFavItem");
var bigFavItem = document.getElementById("bigFavItem");
var submitModalBtn = document.getElementById("submitModalBtn");
var closeModalBtn = document.getElementById("closeModalBtn");
var cancelModalBtn = document.getElementById("cancelModalBtn");
var currentSearch = "";
//user data
var contactForm = document.getElementById("contactForm");
var avatarPreview = document.getElementById("avatarPreview");
var avatarInput = document.getElementById("avatarInput");
var avatarPath = document.getElementById("avatarPath");
var contactName = document.getElementById("contactName");
var contactPhone = document.getElementById("contactPhone");
var contactEmail = document.getElementById("contactEmail");
var contactAddress = document.getElementById("contactAddress");
var contactGroup = document.getElementById("contactGroup");
var contactNotes = document.getElementById("contactNotes");
var contactFavorite = document.getElementById("contactFavorite");
var contactEmergency = document.getElementById("contactEmergency");
var contactCardContainer = document.getElementById("contactCardContainer");
var nameError = document.getElementById("contactNameError");
var phoneError = document.getElementById("contactPhoneError");
var emailError = document.getElementById("contactEmailError");

var contactList = JSON.parse(localStorage.getItem('contacts')) || [];
displayContact();

var currentIndex = null;

function addContact() {

  var contact = {
    userName: contactName.value,
    userPhone: contactPhone.value,
    userEmail: contactEmail.value,
    userAddress: contactAddress.value,
    userGroup: contactGroup.value,
    groupColor: getGroupColor(contactGroup.value),
    userNotes: contactNotes.value,
    userFav: contactFavorite.checked,
    userEmergency: contactEmergency.checked,
    userImage: avatarPath ? "imgs/" + avatarPath.value : "",
  };

  contactList.push(contact);
  contactModal.classList.remove('d-flex')
  contactModal.classList.add('d-none')

  Swal.fire({
    title: "Added !",
    timer: 2000,
    showConfirmButton: false,
    text: "contact has been successfully!",
    icon: "success"
  });
  displayContact()
  clear()

  localStorage.setItem('contacts', JSON.stringify(contactList))
}

closeModalBtn.addEventListener('click', function () {
  contactModal.classList.remove('d-flex')
  contactModal.classList.add('d-none')
  clear()
})

addContactBtn.addEventListener('click', function () {
  contactModal.classList.add('d-flex')
  contactModal.classList.remove('d-none')
})

cancelModalBtn.addEventListener('click', function () {
  contactModal.classList.remove('d-flex')
  contactModal.classList.add('d-none')
  clear()

})

function displayContact() {
  var cartona = "";
  var found = false;
  if (contactList.length <= 0) {
    cartona = ` <div class="col-12 text-center py-5">
                            <div class="d-flex align-items-center justify-content-center mx-auto mb-4 bg-secondary-subtle
                                     rounded-4" style="width: 80px; height: 80px;">
                                <i class="fas fa-address-book text-secondary fs-4"></i>
                            </div>
                            <p class="text-muted fw-semibold mb-1">No contacts found</p>
                            <p class="text-secondary small">
                                Click <strong>"Add Contact"</strong> to get started
                            </p>
                        </div>`


  } else {
    for (var i = 0; i < contactList.length; i++) {
      var colors = getGroupColor(contactList[i].userGroup)
      if (!match(contactList[i]))
        continue;
      found = true;

      cartona += `  <div class="col-md-6 col-lg-12 col-xl-6 mb-4">
                            <div class="contact-card">
                                <div class="contact-card-header">
                                    <div class="d-flex align-items-start justify-content-start gap-3">
                                        <div class="position-relative flex-shrink-0  ">
                                                     ${renderAvatar(contactList[i].userName, contactList[i].userImage)}
                                                ${contactList[i].userEmergency ? `  <div
                                                class="badge-icon badge-heart d-flex justify-content-center align-items-center rounded-circle">
                                                <i class="fas fa-heart-pulse"></i>
                                            </div>`: " "}
                                          
                                            ${contactList[i].userFav ? `<div
                                                class="badge-icon badge-star d-flex justify-content-center align-items-center rounded-circle">
                                                <i class="fas fa-star"></i>
                                            </div>`: " "}
                                            
                                        </div>
                                        <div class="flex-1 min-w-0 pt-1">
                                            <h3 class="contact-card-name truncate m-0 ">${contactList[i].userName}</h3>
                                            <div class="d-flex align-items-center gap-2 mt-1">
                                                <div class="contact-card-phone-container flex-shrink-0">
                                                    <i class="contact-card-phone-icon fas fa-phone"></i>
                                                </div>
                                                <span class="contact-card-phone truncate">${contactList[i].userPhone}</span>
                                            </div>
                                        </div>
                                    </div>


                                    <div class="contact-details">
                                        <div class="contact-detail-item">
                                            <div
                                                class="contact-detail-icon-container d-flex align-items-center justify-content-center violet">
                                                <i class="contact-detail-icon violet fas fa-envelope"></i>
                                            </div>
                                            <span class="contact-detail-text truncate">${contactList[i].userEmail}</span>
                                        </div>

                                        <div class="contact-detail-item">
                                            <div
                                                class="contact-detail-icon-container d-flex align-items-center justify-content-center emerald">
                                                <i class="contact-detail-icon emerald fas fa-location-dot"></i>
                                            </div>
                                            <span class="contact-detail-text truncate">${contactList[i].userAddress}</span>
                                        </div>
                                    </div>


                                   ${contactList[i].userGroup ? ` <div class="contact-tags">
                                        <span class="contact-tag d-inline-flex align-items-center" style="background-color:${colors.bg} ;color:${colors.text} ;border-color:${colors.border} ;">${contactList[i].userGroup}</span>
                                    </div>` : ""
        }
                                </div>


                                <div class="contact-card-actions">
                                    <div class="action-buttons-left">
                                        <a href="tel:${contactList[i].userPhone}" id="callBtn" class="action-button call" title="Call">
                                            <i class="fas fa-phone"></i>
                                        </a>

                                        <a href="mailto:${contactList[i].userEmail}" class="action-button email" id="emailBtn" title="Email">
                                            <i class="fas fa-envelope"></i>
                                        </a>
                                    </div>
                                    <div class="action-buttons-right">
                                        <button class="action-button favorite" id="favBtn" onclick="toggleFav(${i})" title="Favorite">
                                            <i class="${contactList[i].userFav ? "fas text-warning" : " far "} fa-star"></i>
                                        </button>
                                        <button class="action-button emergency" id="emergncyBtn" onclick="toggleEmer(${i})" title="Emergency">
                                            <i class="${contactList[i].userEmergency ? "fas fa-heart-pulse text-danger" : "far "} fa-heart"></i>
                                        </button>
                                        <button class="action-button edit" id="editBtn" onclick="useDataForUpdate(${i})" title="Edit">
                                            <i class="fas fa-pen"></i>
                                        </button>
                                        <button class="action-button delete" id="deleteBtn" onclick="deleteContact(${i})" title="Delete">
                                            <i class="fas fa-trash"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>

                        </div>`

    }
    if (currentSearch && !found) {
      cartona = ` <div class="col-12 text-center py-5">
                            <div class="d-flex align-items-center justify-content-center mx-auto mb-4 bg-secondary-subtle
                                     rounded-4" style="width: 80px; height: 80px;">
                                <i class="fas fa-address-book text-secondary fs-4"></i>
                            </div>
                            <p class="text-muted fw-semibold mb-1">No contacts found</p>
                            <p class="text-secondary small">
                                Click <strong>"Add Contact"</strong> to get started
                            </p>
                        </div>`
    }
  }
  contactCardContainer.innerHTML = cartona;
  updateContactCount();
  updateFav();
  updateEmergncy();
}

function clear() {
  contactName.value = " ";
  contactPhone.value = " ";
  contactEmail.value = " ";
  contactAddress.value = " ";
  contactGroup.value = " ";
  contactNotes.value = " ";
  contactFavorite.checked = false;
  contactEmergency.checked = false;
  currentIndex = null;
  avatarPath.value = null;
  avatarPreview.innerHTML = renderAvatar();

  contactName.classList.remove("is-valid", "is-invalid");
  contactEmail.classList.remove('is-valid','is-invalid')
  contactPhone.classList.remove("is-valid", "is-invalid");
}


function deleteContact(index) {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-danger me-3 fs-6",
      cancelButton: "btn btn-secondary me-3 fs-6"
    },
    buttonsStyling: false
  });
  swalWithBootstrapButtons.fire({
    title: "Delete Contact?",
    text: `Are you sure you want to delete ${contactList[index].userName}? This action cannot be undone.`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: " cancel",
    reverseButtons: false
  }).then((result) => {
    if (result.isConfirmed) {

      contactList.splice(index, 1);
      localStorage.setItem('contacts', JSON.stringify(contactList));
      displayContact();


      swalWithBootstrapButtons.fire({
        timer: 2000,
        showConfirmButton: false,
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success"

      });
    }
  });

}

function useDataForUpdate(index) {
  currentIndex = index;
  var contactsUpdate = contactList[index];

  contactName.value = contactsUpdate.userName;
  contactPhone.value = contactsUpdate.userPhone;
  contactEmail.value = contactsUpdate.userEmail;
  contactAddress.value = contactsUpdate.userAddress;
  contactGroup.value = contactsUpdate.userGroup;
  contactNotes.value = contactsUpdate.userNotes;
  contactFavorite.checked = contactsUpdate.userFav;
  contactEmergency.checked = contactsUpdate.userEmergency;

  contactModal.classList.add('d-flex')
  contactModal.classList.remove('d-none')
   avatarPath.value = contactsUpdate.userImage || "";
  if (contactsUpdate.userImage) {
    avatarPreview.innerHTML = `
        <img src="${contactsUpdate.userImage}" alt="Avatar preview" class="w-100 h-100 rounded-circle object-fit-cover">

    `;
  } else if (contactsUpdate.userName) {
    var initials = contactsUpdate.userName
      .trim() 
      .split(" ") 
      .map((w) => w[0].toUpperCase()) 
      .slice(0, 2) 
      .join("");
    avatarPreview.innerHTML = initials;
  } else {
    avatarPreview.innerHTML = renderAvatar();
  }

}

function sendDataUpdate() {
  contactList[currentIndex] = {
    userName: contactName.value,
    userPhone: contactPhone.value,
    userEmail: contactEmail.value,
    userAddress: contactAddress.value,
    userGroup: contactGroup.value,
    userNotes: contactNotes.value,
    userFav: contactFavorite.checked,
    userEmergency: contactEmergency.checked,
     userImage: avatarPath.value
      ? avatarPath.value.startsWith("imgs/")
        ? avatarPath.value
        : "imgs/" + avatarPath.value
      : "",
  }
  localStorage.setItem('contacts', JSON.stringify(contactList))
  displayContact();
  contactModal.classList.remove('d-flex')
  contactModal.classList.add('d-none')
  Swal.fire({
    title: "Updaeted  !",
    timer: 2000,
    showConfirmButton: false,
    text: "contact has been successfully!",
    icon: "success"
  });
  clear();
}

submitModalBtn.addEventListener("click", function (e) {
  e.preventDefault();
  if (!validateContactInputsWhenSubmit()) return;
  if (currentIndex == null) {
    contactModal.classList.remove("d-flex");
    contactModal.classList.add("d-none");
    // console.log(contactList);
    Swal.fire({
      title: "Added !",
      timer: 2000,
      timerProgressBar: true,
      text: "Contact has been added successfully !",
      icon: "success",
      showConfirmButton: false,
    });
    addContact();
  } else {
    sendUpdateData();
    contactModal.classList.add("d-none");
    contactModal.classList.remove("d-flex");
    Swal.fire({
      title: "Updated !",
      timer: 2000,
      timerProgressBar: true,
      text: "Contact has been updated successfully !",
      icon: "success",
      showConfirmButton: false,
    });
  }
});


function updateContactCount() {
  totalContacts.innerHTML = contactList.length;
  totalContactsSpan.innerHTML = contactList.length;

}


function updateFav() {
  bigFavItem.innerHTML = ""
  var favCount = 0;
  var hasFav = false;
  for (var i = 0; i < contactList.length; i++) {
    var contactFav = contactList[i];
    if (contactFav.userFav) {
      favCount++;
      hasFav = true;
      var contactHtml = `  <div class="col-12">
                                    <div id="smallEmergncyItem"
                                        class="contact-item-emergency  d-flex align-items-center gap-3 p-2 rounded-3">
                                        <div class="flex-shrink-0">
                                            ${renderAvatar(contactList[i].userName, contactList[i].userImage)}
                                        </div>
                                        <div class="flex-grow-1 text-truncate">
                                            <h4 class="mb-0 fw-medium text-dark small text-truncate">${contactFav.userName}</h4>
                                            <p class="mb-0 text-muted small text-truncate">${contactFav.userPhone}</p>
                                        </div>
                                        <a href="tel:${contactFav.userPhone}"
                                            class="call-btn-emergency call-btn-rose d-flex align-items-center justify-content-center flex-shrink-0">
                                            <i class="fas fa-phone"></i>
                                        </a>
                                    </div>
                                </div>`
      bigFavItem.innerHTML += contactHtml;
    }

  }
  totalFavContacts.innerHTML = favCount;
  if (!hasFav) {
    bigFavItem.innerHTML = `<div class="col-12">
                                    <div id="emptyStateFav" class="empty-state">
                                        <p class="text-muted mb-0">No favorites yet</p>
                                    </div>`
  }
}

function updateEmergncy() {
  bigEmergencyItem.innerHTML = ""
  var emergencyCount = 0;
  var hasEmergency = false;
  for (var i = 0; i < contactList.length; i++) {
    var countEmer = contactList[i];
    if (countEmer.userEmergency) {
      emergencyCount++;
      hasEmergency = true;
      var contactHtml = ` 
                                <div class="col-12">
                                    <div id="smallEmergncyItem"
                                        class="contact-item-emergency  d-flex align-items-center gap-3 p-2 rounded-3">
                                        <div class="flex-shrink-0">
                                          ${renderAvatar(contact.userName, contact.userImage)}
                                        </div>
                                        <div class="flex-grow-1 text-truncate">
                                            <h4 class="mb-0 fw-medium text-dark small text-truncate">${contact.userName}</h4>
                                            <p class="mb-0 text-muted small text-truncate">${contact.userName}</p>
                                        </div>
                                        <a href="tel:${contact.userName}"
                                            class="call-btn-emergency call-btn-rose d-flex align-items-center justify-content-center flex-shrink-0">
                                            <i class="fas fa-phone"></i>
                                        </a>
                                    </div>
                                </div>`
      bigEmergencyItem.innerHTML += contactHtml;
    }

  }
  totalEmergencyContacts.innerHTML = emergencyCount;
  if (!hasEmergency) {
    bigEmergencyItem.innerHTML = `<div class="col-12">
                                    <div id="emptyStateFav" class="empty-state">
                                        <p class="text-muted mb-0">No favorites yet</p>
                                    </div>`
  }
}


function toggleFav(index) {
  contactList[index].userFav = !contactList[index].userFav;
  localStorage.setItem('contacts', JSON.stringify(contactList))
  displayContact();
  updateFav();

}
function toggleEmer(index) {
  contactList[index].userEmergency = !contactList[index].userEmergency;
  localStorage.setItem('contacts', JSON.stringify(contactList))
  displayContact();
  updateEmergncy();

}

searchInput.addEventListener('input', function () {
  currentSearch = searchInput.value.trim().toLowerCase();
  displayContact();
});

function match(contact) {
  return (
    contact.userName.toLowerCase().includes(currentSearch) ||
    (contact.userPhone && contact.userPhone.includes(currentSearch)) ||
    (contact.userEmail && contact.userEmail.toLowerCase().includes(currentSearch))
  );
}


function getGroupColor(group) {
  var colorGroup = {
    family: { bg: "#cfe8ff", text: "#1e40af", border: "#93c5fd" },
    friends: { bg: "#d1fae5", text: "#065f46", border: "#6ee7b7" },
    work: { bg: "#ede9fe", text: "#5b21b6", border: "#c4b5fd" },
    school: { bg: "#fef3c7", text: "#b45309", border: "#fde68a" },
    other: { bg: "#f3f4f6", text: "#374151", border: "#d1d5db" },
  }
  return colorGroup[group] || colorGroup["other"]
}

avatarInput.addEventListener("change", function () {
  var file = avatarInput.files[0];
  console.log(file);
  avatarPath.value = file.name;
  avatarPreview.innerHTML = `
    <img src="imgs/${file.name}" alt="Avatar preview" class="w-100 h-100 rounded-circle object-fit-cover">

  `;
});

function getAvatarColors() {
  return [
    { from: "#3b82f6", to: "#2563eb" }, // blue
    { from: "#8b5cf6", to: "#6d28d9" }, // violet
    { from: "#10b981", to: "#0d9488" }, // emerald
    { from: "#f43f5e", to: "#db2777" }, // rose
    { from: "#f59e0b", to: "#ea580c" }, // amber
    { from: "#06b6d4", to: "#2563eb" }, // cyan
    { from: "#6366f1", to: "#8b5cf6" }, // indigo
    { from: "#d946ef", to: "#ec4899" }, // fuchsia
  ];
}

function getColorByName(name) {
  var colorsAvatar = getAvatarColors();
  var index = name.length % colorsAvatar.length;
  return colorsAvatar[index];
}



function renderAvatar(name = "", imagePath = "") {
  // image
  if (imagePath && imagePath !== "imgs/" && imagePath !== "") {
    return `
        <img src="${imagePath}" alt="avatar"
                                                class="contact-card-avatar  object-fit-cover">
    `;
  }
  
  if (name && name.trim() !== "") {
    var initials = name
      .trim() 
      .split(" ") 
      .map((w) => w[0].toUpperCase()) 
      .slice(0, 2) 
      .join(""); 

    var colorAvatar = getColorByName(name);

    return `
        <div class="contact-card-avatar d-flex align-items-center justify-content-center text-white fw-bold" style="background: linear-gradient(135deg,${colorAvatar.from},${colorAvatar.to});">
          ${initials}
                        </div>
      `;
  }

  return `
      <div class="contact-card-avatar d-flex align-items-center justify-content-center" >
                                          <i class="fas fa-user"></i>

                        </div>
  `;
}


function showInvalid(input, errorDiv) {
  input.classList.add("is-invalid");
  input.classList.remove("is-valid");
  errorDiv.classList.remove("d-none");
}
function clearInvalid(input, errorDiv) {
  input.classList.remove("is-invalid");
  input.classList.add("is-valid");
  errorDiv.classList.add("d-none");
}



var validationRules = {
  name: {
    regex: /^[a-zA-Z\u0600-\u06FF\s]{2,50}$/,
    errorId: "contactNameError",
    message: "Name should contain only letters (2–50 characters)",
  },
  phone: {
    regex: /^(01|(\+20|0020|20)1)[0125][0-9]{8}$/,
    errorId: "contactPhoneError",
    message: "Please enter a valid Egyptian phone number",
  },
  email: {
    regex: /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/,
    errorId: "contactEmailError",
    message: "Please enter a valid email address",
    optional: true,
  },
};



function showInvalid(input, errorId) {
  input.classList.add("is-invalid");
  input.classList.remove("is-valid");
  document.getElementById(errorId).classList.remove("d-none");
}
function clearInvalid(input, errorId) {
  input.classList.remove("is-invalid");
  input.classList.add("is-valid");
  document.getElementById(errorId).classList.add("d-none");
}

function validateFields(input, rule) {
  var value = input.value.trim();
  var errorEl = document.getElementById(rule.errorId);

  console.log(rule);
  console.log(rule.errorId);
  console.log(errorEl);
  if (!value && rule.optional) {
    input.classList.remove("is-valid", "is-invalid");
    errorEl.classList.add("d-none");
    return true;
  }
  if (!value || !rule.regex.test(value)) {
    showInvalid(input, rule.errorId);
    return false;
  }
  clearInvalid(input, rule.errorId);
  return true;
}

contactName.addEventListener("input", function () {
  validateFields(contactName, validationRules.name);
});
contactEmail.addEventListener("input", function () {
  validateFields(contactEmail, validationRules.email);
});
contactPhone.addEventListener("input", function () {
  validateFields(contactPhone, validationRules.phone);
});


function validateContactInputsWhenSubmit() {
  var isNameValid = validateFields(contactName, validationRules.name);
  var isEmailValid = validateFields(contactEmail, validationRules.email);
  var isPhoneValid = validateFields(contactPhone, validationRules.phone);

  if (!isNameValid) {
    Swal.fire({
      title: "Missing Name !",
      text: validationRules.name.message,
      icon: "error",
      customClass: { container: "swal-container" },
    });
    contactName.focus();
    return false;
  }

  if (!isPhoneValid) {
    Swal.fire({
      title: "Missing Phone !",
      text: validationRules.phone.message,
      icon: "error",
      customClass: { container: "swal-container" },
    });
    contactPhone.focus();
    return false;
  }

  if (!isEmailValid) {
    Swal.fire({
      title: "Invalid Email !",
      text: validationRules.email.message,
      icon: "error",
      customClass: { container: "swal-container" },
    });
    contactEmail.focus();
    return false;
  }
  if (isPhoneDuplicate(contactPhone.value, currentIndex)) {
    showInvalid(contactPhone, "contactPhoneError");
    Swal.fire({
      title: "Duplicat Phone !",
      text: `this phone is already exists`,
      icon: "error",
      customClass: { container: "swal-container" },
    });
    contactPhone.focus();
    return false;
  }
  return true;
}


function normalizePhoneNumberEgyptian(phone) {
  if (!phone || typeof phone !== "string") {
    return ";";
  }

  phone = phone.replace(/D/g, "");
  // 20
  if (phone.startsWith("20")) {
    phone = "0" + phone.slice(2);
  }
  //0020
  if (phone.startsWith("0020")) {
    phone = "0" + phone.slice(4);
  }
  return phone;
}
function isPhoneDuplicate(phone, index) {
  var normalizeInput = normalizePhoneNumberEgyptian(phone); //form
  for (var i = 0; i < contactList.length; i++) {
    if (i === index) continue;
    var normlizedStored = normalizePhoneNumberEgyptian(
      contactList[i].userPhone,
    ); 
    if (normalizeInput === normlizedStored) {
      return true;
    }
  }
  return false;
}



