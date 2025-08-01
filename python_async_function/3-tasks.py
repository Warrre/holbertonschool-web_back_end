#!/usr/bin/env python3
"""This module provides a function that returns an asyncio.Task for wait_random."""

import asyncio
from typing import Any
wait_random = __import__('0-basic_async_syntax').wait_random

def task_wait_random(max_delay: int) -> asyncio.Task:
    """
    Return an asyncio.Task for wait_random with the given max_delay.

    Args:
        max_delay (int): Maximum delay for wait_random.

    Returns:
        asyncio.Task: The created asyncio Task.
    """
    return asyncio.create_task(wait_random(max_delay))
