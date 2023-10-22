<script setup lang="ts">
import { ref } from "vue"

const props = defineProps<{
    ingredientsList: {
        amount: string
        name: string
    }[]
}>()

const isCopied = ref(false)

const handleCopyList = () => {
    const list = props.ingredientsList
        .map(({ amount, name }) => `${name} - ${amount}`)
        .join("\n")

    navigator.clipboard.writeText(list)

    isCopied.value = true

    setTimeout(() => {
        isCopied.value = false
    }, 1000)
}
</script>

<template>
    <div class="container mb-5 mt-2">
        <div class="row">
            <div
                class="col-12 mb-2 mt-4 d-flex justify-content-between align-items-center"
            >
                <h2 class="fw-light">📝 Shopping List</h2>

                <button
                    :class="['btn', isCopied ? 'btn-success' : 'btn-primary']"
                    @click="handleCopyList"
                >
                    <i v-if="isCopied" class="fa-solid fa-check"></i>
                    <i v-else class="far fa-copy"></i>
                </button>
            </div>

            <div class="col-12">
                <table class="table small">
                    <thead>
                        <tr>
                            <th scope="col">Ingredient</th>
                            <th scope="col">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="ingredient in ingredientsList"
                            :key="ingredient.name"
                        >
                            <td>{{ ingredient.name }}</td>
                            <td>{{ ingredient.amount }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
