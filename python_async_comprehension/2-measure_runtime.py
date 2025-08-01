#!/usr/bin/env python3
"""This module measures the runtime of running async_comprehension four times in parallel."""

import asyncio
import time
async_comprehension = __import__('1-async_comprehension').async_comprehension

async def measure_runtime() -> float:
    """
    Run async_comprehension four times in parallel and measure the total runtime.

    Returns:
        float: The total runtime in seconds.
    """
    start = time.time()
    await asyncio.gather(*(async_comprehension() for _ in range(4)))
    return time.time() - start
