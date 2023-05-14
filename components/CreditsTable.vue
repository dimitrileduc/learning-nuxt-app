<template>
  <div class="w-full">
    <div class="separator_container w-full pb-2">
      <nuxt-img class="w-full" alt="separator" src="/separator_big.svg" />
    </div>
    <div v-if="loading">Loading...</div>
    <div v-else-if="loading.length === 0">No transactions</div>
    <div v-else>
      <table class="table-auto w-full border-none">
        <thead>
          <tr>
            <th class="px-2 md:px-4 py-2 text-left">Id</th>
            <th class="px-2 md:px-4 py-2 text-left">Type</th>
            <th class="px-2 md:px-4 py-2 text-left">Date</th>

            <th class="md:px-4 py-2 flex items-end justify-end">
              <nuxt-icon class="text-[24px]" name="lune" filled />
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(transaction, index) in transactions"
            :key="transaction.id"
            :class="index % 2 === 0 ? 'bg-[#EFF7F7]' : 'bg-transparent'"
          >
            <td class="px-2 md:px-4 py-2 text-left">
              {{ transaction.id }}
            </td>
            <td class="px-2 md:px-4 py-2 text-left font-bold">
              {{ transaction.amount ? "Credit Purchase" : "Video Purchase" }}
            </td>
            <td class="px-2 md:px-4 py-2 text-left">
              {{ new Date(transaction.createdAt).toLocaleDateString("en-GB") }}
            </td>
            <td class="px-2 md:px-4 py-2 text-right font-bold">
              {{
                transaction.amount
                  ? "+" + transaction.amount
                  : "-" + transaction.creditUsed
              }}
            </td>
          </tr>
        </tbody>
      </table>
      <div class="separator_container w-full pt-2">
        <nuxt-img class="w-full" alt="separator" src="/separator_big.svg" />
      </div>
    </div>
  </div>
</template>

<style>
tr.bg-blue-100 {
  background-color: #eff7f7;
}
</style>

<script setup>
const { transactions, loading } = await useTransactions();
</script>

<style scoped></style>
