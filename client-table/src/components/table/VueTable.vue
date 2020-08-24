<template>
  <div>
    <input
      type="text"
      v-model="search"
      class="form-control badge-pill w-auto mb-2"
      placeholder="search"
    />
    <table class="table table-hover">
      <thead>
        <tr align="left">
          <th scope="col">
            <label name="uname"
              >Uname <i @click="sortByUpUname">&#42779;</i>
              <i @click="sortByDownUname">&#42780;</i>
            </label>
          </th>
          <th scope="col">
            <label name="fullname"
              >Fullname <i @click="sortByUpFullname">&#42779;</i>
              <i @click="sortByDownFullname">&#42780;</i></label
            >
          </th>
          <th scope="col">
            <label name="email"
              >Email <i @click="sortByUpEmail">&#42779;</i>
              <i @click="sortByDownEmail">&#42780;</i></label
            >
          </th>
          <th scope="col">
            <label name="address"
              >Address <i @click="sortByUpAddress">&#42779;</i>
              <i @click="sortByDownAddress">&#42780;</i></label
            >
          </th>
          <th scope="col">
            <label name="company"
              >Company <i @click="sortByUpCompany">&#42779;</i>
              <i @click="sortByDownCompany">&#42780;</i></label
            >
          </th>
        </tr>
      </thead>
      <template>
        <tbody v-if="search.length === 0" align="left">
          <tr v-for="user in paginatedUsers" :key="user.id">
            <td>{{ user.uname }}</td>
            <td>{{ user.fullname }}</td>
            <td>{{ user.email }}</td>
            <td>
              {{ user.address.city }} {{ user.address.state }}
              {{ user.address.streetAddress }} {{ user.address.zip }}
            </td>
            <td>{{ user.company }}</td>
            <td>
              <button
                class="small badge-pill"
                @click.prevent="getCurrentUser(user)"
                @keydown.esc="showModal = false"
              >
                <VueModal v-if="showModal" :userData="currentUser" />
                Edit
              </button>
            </td>
          </tr>
        </tbody>
        <tbody v-else align="left">
          <tr v-for="user in filteredList" :key="user.id">
            <td>{{ user.uname }}</td>
            <td>{{ user.fullname }}</td>
            <td>{{ user.email }}</td>
            <td>
              {{ user.address.city }} {{ user.address.state }}
              {{ user.address.streetAddress }} {{ user.address.zip }}
            </td>
            <td>{{ user.company }}</td>
            <td>
              <button
                class="small badge-pill"
                @click.prevent="getCurrentUser(user)"
                @keydown.esc="showModal = false"
              >
                <VueModal v-if="showModal" :userData="currentUser" /> Edit
              </button>
            </td>
          </tr>
        </tbody>
      </template>
    </table>
    <div class="table-pagination small">
      <button @click="onClickPreviousPage">
        &#60;
      </button>

      <div
        type="button"
        class="page-link"
        v-for="page in pages"
        :key="page"
        @click="getPage(page)"
        :class="{ pageSelected: page === pageNumber }"
      >
        {{ page }}
      </div>

      <button @click="onClickNextPage">
        &#62;
      </button>
    </div>
  </div>
</template>

<script>
import VueModal from "@/components/table/VueModal";
export default {
  name: "VueTable",
  components: {
    VueModal,
  },
  props: {
    usersData: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {
      userPerPage: 20,
      pageNumber: 1,
      search: "",
      currentUser: "",
      showModal: false,
    };
  },
  computed: {
    pages() {
      return Math.ceil(this.usersData.length / 20);
    },
    paginatedUsers() {
      let start = (this.pageNumber - 1) * this.userPerPage;
      let end = start + this.userPerPage;
      return this.usersData.slice(start, end);
    },
    filteredList() {
      return this.usersData.filter((user) => {
        return (
          user.uname.toLowerCase().includes(this.search.toLowerCase()) ||
          user.fullname.toLowerCase().includes(this.search.toLowerCase()) ||
          user.email.toLowerCase().includes(this.search.toLowerCase()) ||
          user.address.city.toLowerCase().includes(this.search.toLowerCase()) ||
          user.address.state
            .toLowerCase()
            .includes(this.search.toLowerCase()) ||
          user.address.streetAddress
            .toLowerCase()
            .includes(this.search.toLowerCase()) ||
          user.address.zip.toLowerCase().includes(this.search.toLowerCase()) ||
          user.company.toLowerCase().includes(this.search.toLowerCase())
        );
      });
    },
  },
  methods: {
    getPage(page) {
      this.pageNumber = page;
    },
    onClickNextPage() {
      this.pageNumber++;
    },
    onClickPreviousPage() {
      this.pageNumber--;
    },
    sortByUpUname() {
      this.usersData.sort((a, b) => a.uname.localeCompare(b.uname));
    },
    sortByDownUname() {
      this.usersData.sort((a, b) => b.uname.localeCompare(a.uname));
    },
    sortByUpFullname() {
      this.usersData.sort((a, b) => a.fullname.localeCompare(b.fullname));
    },
    sortByDownFullname() {
      this.usersData.sort((a, b) => b.fullname.localeCompare(a.fullname));
    },
    sortByUpEmail() {
      this.usersData.sort((a, b) => a.email.localeCompare(b.email));
    },
    sortByDownEmail() {
      this.usersData.sort((a, b) => b.email.localeCompare(a.email));
    },
    sortByUpCompany() {
      this.usersData.sort((a, b) => a.company.localeCompare(b.company));
    },
    sortByDownCompany() {
      this.usersData.sort((a, b) => b.company.localeCompare(a.company));
    },
    sortByUpAddress() {
      this.usersData.sort(
        (a, b) =>
          a.address.city.localeCompare(b.address.city) &&
          a.address.state.localeCompare(b.address.state) &&
          a.address.streetAddress.localeCompare(b.address.streetAddress) &&
          a.address.zip.localeCompare(b.address.zip)
      );
    },
    sortByDownAddress() {
      this.usersData.sort(
        (a, b) =>
          b.address.city.localeCompare(a.address.city) &&
          b.address.state.localeCompare(a.address.state) &&
          b.address.streetAddress.localeCompare(a.address.streetAddress) &&
          b.address.zip.localeCompare(a.address.zip)
      );
    },
    getCurrentUser(user) {
      this.showModal = !this.showModal;
      this.currentUser = user;
    },
  },
};
</script>
<style scoped>
.table-pagination {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 30px;
}

.page {
  padding: 8px;
  border: solid 1px grey;
  margin-right: 5px;
}

.page:hover {
  background: #3c70a9;
  color: #ffffff;
  cursor: pointer;
}
.pageSelected {
  background: #2fa79c;
  color: #ffffff;
  cursor: pointer;
}
label i {
  cursor: pointer;
}

@media only screen and (max-width: 760px),
  (min-device-width: 768px) and (max-device-width: 1024px) {
  table,
  thead,
  tbody,
  th,
  td,
  tr {
    display: block;
  }

  thead tr {
    position: absolute;
    top: -9999px;
    left: -9999px;
  }

  tr {
    border: 1px solid #ccc;
  }

  td {
    border: none;
    border-bottom: 1px solid #eee;
    position: relative;
    padding-left: 50%;
  }

  td:before {
    position: absolute;
    top: 6px;
    left: 6px;
    width: 45%;
    padding-right: 10px;
    white-space: nowrap;
  }
}
</style>
