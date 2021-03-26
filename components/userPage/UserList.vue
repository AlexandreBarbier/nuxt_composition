<template>
  <div class="grid grid-flow-row gap-2 overflow-scroll h-40">
    <UserItem v-for="user in users" :key="user.id" :user="user" :selected="selected === user.id" @click.native="selectItem(user.id)" />
  </div>
</template>

<script lang="ts">
import { defineComponent, useFetch, ref, computed, onMounted } from '@nuxtjs/composition-api'
import userState from '@/composables/users'
import { UserListFilters } from '@/types/enum/filters'

export default defineComponent({
  name: 'UserList',
  props: {
    filter: {
      type: String,
      default: UserListFilters.All,
      validator: (x: UserListFilters) => { return Object.values(UserListFilters).includes(x) }
    }
  },
  setup () {
    const { fetchUsers, getFilteredUsers } = userState()
    const selected = ref('')
    onMounted(async () => {

      await fetchUsers()
    })

    return { users: computed(() => { return getFilteredUsers(UserListFilters.ExceptMe).value.map(x => x.value) }), selected }
  },
  methods: {
    selectItem (itemId:string) {
      this.selected = itemId
      this.$emit('select', itemId)
    }
  }
})
</script>
