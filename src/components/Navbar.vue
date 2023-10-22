<script setup lang="ts">
defineProps<{
    onClickRefresh: () => void
    onClickSetup: () => void
    url: string | null
}>()
</script>

<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
        <div class="container">
            <a class="navbar-brand" href="./">🛒 Shopping List</a>

            <button
                v-if="url"
                @click="onClickRefresh"
                class="btn btn-primary"
                type="button"
            >
                <i class="fa-solid fa-arrows-rotate"></i>
            </button>

            <button
                v-else
                @click="onClickSetup"
                class="btn btn-primary"
                type="button"
            >
                <i class="fa-solid fa-link"></i>
            </button>
        </div>
    </nav>
</template>
